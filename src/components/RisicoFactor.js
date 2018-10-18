const ChooComponent = require("choo/component");
const html = require("choo/html");

module.exports = class RisicoFactor extends ChooComponent {
	constructor (result) {
		super();
		this._CACHEDRESULT = result;
	}

	updateFactor (self) {
		const minAngle = Math.PI * .7;
		const maxAngle = Math.PI * 2.3;
		const percentage = this._CACHEDRESULT / 100;
		const currentAngle = minAngle + percentage * maxAngle;
		if (!self.context) this.context = self.element.getContext("2d");
		if (!self.width) this.width = self.context.canvas.width;
		if (!self.height) this.height =  self.context.canvas.height;
		self.context.lineWidth = 6;
		self.context.imageSmoothingQuality = "low";
		self.context.lineCap = "round";
		self.context.clearRect(0, 0, this.width, this.height);
		self.context.strokeStyle = "#D1D8EF";
		self.context.beginPath();
		self.context.arc(this.width / 2, this.height / 2, this.width / 2 - 10, minAngle, maxAngle);
		self.context.stroke();
		self.context.strokeStyle = `rgb(${70 + 185 * percentage}, ${161 - 161 * percentage}, ${251 - 251 * percentage})`;
		self.context.beginPath();
		self.context.arc(this.width / 2, this.height / 2, this.width / 2 - 10, minAngle, Math.min(currentAngle, maxAngle));
		self.context.stroke();
		self.context.fillStyle = "black";
		self.context.font = "2rem 'Work Sans'";
		const xOffset = self.context.measureText(this._CACHEDRESULT).width / 2;
		self.context.textAlign = "center";
		self.context.fillText(this._CACHEDRESULT, this.width / 2 - xOffset / 2, this.height / 2 + 12);
		self.context.fillStyle = "rgba(0, 0, 0, .33)";
		self.context.font = "1rem 'Work Sans'";
		self.context.fillText("%", this.width / 2 + xOffset / 2 + 6, this.height / 2 + 12);
	}

	createElement (state, emit) {
		setTimeout(() => this.updateFactor(this), 1);
		return html`<canvas id="risicoFactor" width=120 height=120></canvas>`;
	}

	update (state, emit) {
		if (this._CACHEDRESULT === state.result) return;
		this._CACHEDRESULT = state.result;
		this.updateFactor(this);
	}
}