const ChooComponent = require("choo/component");
const html = require("choo/html");


module.exports = class FormCategory extends ChooComponent {
	constructor (name, selects) {
		super();
		this.name = name;
		this.selects = selects;
		this.filledSelects = 0;
	}

	createElement (state, emit) {
		return html`
			<ul class="closed formCategory">
				<h2 onclick=${() => this.element.classList.toggle("closed")}>${this.name}</h2>
				${this.selects.map(select => html`<li>${select.render(state, emit)}</li>`)}
				<p class="filledCounter">${this.filledSelects}/${this.selects.length}</p>
				<img src="images/arrow.png"/>
			</ul>
		`;
	}

	update (state, emit) {
		return false;
	}
}