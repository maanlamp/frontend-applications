const ChooComponent = require("choo/component");
const html = require("choo/html");

module.exports = class SearchBar extends ChooComponent {
	constructor (categories) {
		super();
		this.categories = categories;
	}

	createElement (state, emit) {
		return html`
			<input placeholder="Zoek..." id="searchBar" type="text" spellcheck="false" oninput=${event => {
				clearTimeout(window.searchTimeout);
				window.searchTimeout = setTimeout(() => {
					const value = this.element.value.toLowerCase();
					if (!value || value.length < 3) {
						document.querySelectorAll(".formCategory").forEach(formCategory => {
							formCategory.classList.add("closed");
						});
						return;
					}
					document.querySelectorAll(".formCategory").forEach((formCategory, i) => {
						if (formCategory.innerText.toLowerCase().includes(value)) {
							formCategory.classList.remove("closed");
							if (i === 1) { //Scroll only to first category
								setTimeout(() => {
									formCategory.scrollIntoView({
										behavior: "smooth"
									});
								}, 500); //500ms is transition duration.
							}
						} else {
							formCategory.classList.add("closed");
						}
					});
				}, 250);
			}}/>
		`;
	}

	update (state, emit) {
		return false;
	}
}