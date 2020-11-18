class ColorsIterator {
	constructor(colors) {
		this.colors = colors;
		this.colorIndex = 0;
	}

	hasNext() {
		return this.colors.length > this.colorIndex;
	}

	next() {
		if (!this.hasNext()) this.colorIndex = 0;

		const colorToReturn = this.colors[this.colorIndex];
		this.colorIndex += 1;

		return colorToReturn;
	}
}

export default ColorsIterator;
