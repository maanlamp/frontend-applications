const ChooComponent = require("choo/component");
const html = require("choo/html");

module.exports = class ZwaarstePuntjes extends ChooComponent {
	constructor () {
		super();
		this.best = [];
		this.worst = [];
	}

	set (best, worst) {
		this.best = best;
		this.worst = worst;
	}

	createElement (state, emit) {
		return html`
			<div id="zwaarstePuntjes" class="card">
				<h2>Belangrijkste punten</h2>
				<h3>Bekijk hier de punten waarop u iemand kan complimenteren, en de punten waaraan nog gewerkt kan worden.</h3>
				<ul>
					${this.best.map(item => html`<li class="best">${item.label}: ${item.value}</li>`)}
					${this.worst.map(item => html`<li class="worst">${item.label}: ${item.value}</li>`)}
				</ul>
			</div>
		`;
	}

	update (state, emit) {
		return true;
	}
}