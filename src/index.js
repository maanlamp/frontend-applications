const choo = require("choo");
const html = require("choo/html");
const RisicoFactor = require("./components/RisicoFactor");
const OpletPuntjes = require("./components/OpletPuntjes");
const ZwaarstePuntjes = require("./components/ZwaarstePuntjes");
const Form = require("./components/Form");
const FormCategory = require("./components/FormCategory");
const Select = require("./components/Select");
const SearchBar = require("./components/SearchBar");

const app = choo(); //Choo choo boiis, the pain train is leaving!

app.use((state, emitter) => {
	state.result = 0;
	state.selectIDCount = 0;
	state.data = require("./data");
	state.categories = [];
	for (const category in state.data) {
		if (category === "Intercept") continue;
		const factors = state.data[category];
		const selects = factors.map(factor => {
			if (factor.items) return new Select(factor);
			return new Select(factor.label, factor.weight);
		});
		state.categories.push(new FormCategory(category, selects));
	}
	delete state.data;
	state.components.form = new Form(state.categories);
	state.components.risicoFactor = new RisicoFactor(state.result);
	state.components.opletPuntjes = new OpletPuntjes();
	state.components.zwaarstePuntjes = new ZwaarstePuntjes();
	state.components.searchBar = new SearchBar();

	emitter.on("DOMContentLoaded", () => {
		//Add select eventlisteners
		document.querySelectorAll("select").forEach(select => {
			select.addEventListener("change", event => {
				//Keep track of amount of filled fields
				trackFieldFillCount(event, state);
				emitter.emit("saveAnswers");
			});

			loadState();
			trackFieldFillCount(null, state);
			emitter.emit("saveAnswers");
		});

		//Some nice js to beautify <3
		window.addEventListener("resize", () => {
			//Timeout to only refresh UI once after resizing
			clearTimeout(window.UIUpdateTimeout);
			window.UIUpdateTimeout = setTimeout(() => {
				fitTitlesToForm();
			}, 500);
		});

		fitTitlesToForm();
		updateULTransitionTargetHeight();
	});

	emitter.on("saveAnswers", () => {
		state.answers = [];
		state.categories.forEach(category => {
			category.selects.forEach(select => {
				state.answers.push(select.save());
			});
		});

		state.denkHetjes = state.answers.filter(answer => {
			return answer.value.includes("Denk het");
		});

		const filteredAnswers = state.answers.filter(answer => {
			return !answer.value.toLowerCase().includes("onbekend");
		});
		state.best = getBestFrom(filteredAnswers);
		state.worst = getWorstFrom(filteredAnswers);
			
		state.components.opletPuntjes.set(state.denkHetjes);
		state.components.zwaarstePuntjes.set(state.best, state.worst);

		emitter.emit("calculateRisk");
		emitter.emit("render");
	});

	emitter.on("calculateRisk", () => {
		const risk = state.answers
			.reduce((total, answer) => total + answer.weight, 0);
		const formule = Number(
			Math.round(
				1 / (
					1 + Math.exp(
						-1 * (
							-8.57219 + risk
						)
					)
				) * 100
			)
		);
		state.result = formule;
	});

	emitter.on("*", () => saveState());
	window.addEventListener("beforeunload", () => saveState());
});

app.route("/", (state, emit) => {
	return html`
		<body>
			<main id="viewport">
				<h1>Risicotaxatie</h1>
				<div class="flexContainer">
					${state.components.searchBar.render(state, emit)}
					${state.components.form.render(state, emit)}
				</div>
				<div class="flexContainer">
					${state.components.risicoFactor.render(state, emit)}
					${state.components.opletPuntjes.render(state, emit)}
					${state.components.zwaarstePuntjes.render(state, emit)}
				</div>
			</main>
		</body>
	`;
});

app.mount("body");

function trackFieldFillCount(event, state) {
	function updateFilledFieldCount(ul) {
		let counter = ul.querySelector(".filledCounter");
		const formCategory = state.categories.find(category => category._id === ul.id);
		const filledCount = formCategory.selects.reduce((total, selectWrapper) => {
			const select = selectWrapper.element.querySelector("select");
			return total + !(select.value.toLowerCase().includes("onbekend"));
		}, 0);
		counter.innerText = filledCount + counter.innerText.slice(counter.innerText.indexOf("/"));
		if (filledCount === formCategory.selects.length) {
			ul.style.filter = "opacity(.5) saturate(0)";
			ul.classList.add("closed");
		}
		else {
			ul.removeAttribute("style");
		}
	}

	if (event) {
		let ul = event.srcElement;
		while (ul.nodeName !== "UL") {
			ul = ul.parentElement;
		}
		updateFilledFieldCount(ul);
	} else {
		document.querySelectorAll(".formCategory").forEach(formCategory => {
			updateFilledFieldCount(formCategory);
		});
	}
}

function updateULTransitionTargetHeight () {
	document.querySelectorAll("form>ul").forEach(ul => {
		const height = Array.from(ul.children)
			.filter(element => element.nodeName !== "IMG")
			.reduce((height, element) => height + Number(getComputedStyle(element).height.slice(0, -2)), 0);
		const padding = Number(getComputedStyle(ul).padding.slice(0, -2));
		const margin = Number(getComputedStyle(ul).marginBottom.slice(0, -2));
		const errorMargin = 100;
		ul.style.maxHeight = `${height + padding * 4 + margin * 4 + errorMargin}px`;
	});
}

function fitTitlesToForm () {
	const targetWidth = Number(getComputedStyle(document.querySelector("form>ul")).width.slice(0, -2) - 120);
	document.querySelectorAll("form>ul>h2").forEach(h2 => {
		h2.style.display = "inline-block";
		h2.style.fontSize = "1px";
		let h2Style = getComputedStyle(h2);
		let width = Number(h2Style.width.slice(0, -2));
		let fontSize = Number(h2Style.fontSize.slice(0, -2));
		let i = 0;
		const stepSize = .2;
		while (width < targetWidth) {
			h2.style.fontSize = `${fontSize + (i++ * stepSize)}px`;
			h2Style = getComputedStyle(h2);
			width = Number(h2Style.width.slice(0, -2));
			fontSize = Number(h2Style.fontSize.slice(0, -2));
		}
		h2.style.fontSize = `${Math.min(fontSize, 24)}px`;
		h2.style.display = "block";
	});
}

function getWorstFrom (input) { 
	return input.filter(item => Number(item.weight) > 0 && item.value === "Ja")
		.concat(
			input.filter(item => Number(item.weight) < 0 && item.value === "Nee")
		)
		.sort((a, b) => Math.abs(Number(a.weight)) > Math.abs(Number(b.weight)) ? 1 : -1)
		.slice(0, 3);
}

function getBestFrom (input) {
	return input.filter(item => Number(item.weight) <= 0 && item.value === "Ja")
		.concat(
			input.filter(item => Number(item.weight) >= 0 && item.value === "Nee")
		)
		.sort((a, b) => Math.abs(Number(a.weight)) > Math.abs(Number(b.weight)) ? 1 : -1)
		.slice(0, 3);
}

function saveState () {
	const selects = [];
	document.querySelectorAll("select").forEach(select => {
		selects.push({id: select.id, index: select.selectedIndex});
	});
	localStorage.setItem("selects", JSON.stringify(selects));
}

function loadState () {
	const selects = JSON.parse(localStorage.getItem("selects"));
	if (!selects) return;
	selects.forEach(select => {
		const selectElement = document.querySelector(`#${select.id}`);
		selectElement.selectedIndex = select.index;
	});
}