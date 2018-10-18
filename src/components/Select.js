const ChooComponent = require("choo/component");
const html = require("choo/html");
const raw = require("choo/html/raw");

module.exports = class Select extends ChooComponent {
	constructor (input, weight) {
		super();
		if (typeof input === "string") {
			this.label = input;
			this.items = ["Ja", "Denk het wel", "Onbekend", "Denk het niet", "Nee"];
			this.default = "Onbekend";
		} else {
			Object.assign(this, input);
		}
		this.weight = weight;
	}

	save () {
		const value = this.element.querySelector("select").value;
		const weight = this.weight || this.items.find(item => item.label === value).weight;
		return {
			id: this._id,
			value: value,
			weight: weight,
			label: this.label
		};
	}

	set (value) {
		this.element.querySelector("select").value = value;
	}

	renderOption (item) {
		if (typeof item === "object") {
			return html`<option value="${item.label}" data-weight="${item.weight}">${item.label}</option>`;
		} else {
			if (item === this.default) {
				return html`<option selected value=${item}>${item}</option>`;
			} else {
				return html`<option value=${item}>${item}</option>`;
			}
		}
	}

	createElement (state, emit) {
		return html`
			<div class="selectWrapper">
				<h3>${this.label}</h3>
				<select>
					${this.items.map(item => this.renderOption(item))}
				</select>
			</div>
		`;
	}

	update (state, emit) {
		return false;
	}
}