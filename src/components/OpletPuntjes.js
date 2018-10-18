const ChooComponent = require("choo/component");
const html = require("choo/html");

module.exports = class OpletPuntjes extends ChooComponent {
	constructor () {
		super();
		this.items = [];
	}

	set (array) {
		this.items = array;
	}

	createElement (state, emit) {
		return html`
			<div id="opletPuntjes" class="card">
				<h2>Let op!</h2>
				<h3>U hebt bij de volgende punten aangegeven niet zeker te zijn van uw antwoord. Overleg met een collega en/of probeer een objectief antwoord te krijgen.</h3>
				<ul>
					${this.items.map(item => html`<li>${item.label}: ${item.value}</li>`)}
				</ul>
			</div>
		`;
	}

	update (state, emit) {
		return true;
	}
}