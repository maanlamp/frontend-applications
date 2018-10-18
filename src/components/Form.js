const ChooComponent = require("choo/component");
const html = require("choo/html");

module.exports = class Form extends ChooComponent {
	constructor (categories) {
		super();
		this.categories = categories;
	}

	createElement (state, emit) {
		return html`
			<form>
				${this.categories.map(category => category.render(state, emit))}
			</form>
		`;
	}

	update (state, emit) {
		return false;
	}
}