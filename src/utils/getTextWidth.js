export default function getTextWidth(text, fontSize = 11, fontFace = 'Tahoma') {
	const lines = `${text}`.split('\n');
	const sizes = lines.map((line) => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		context.font = `${fontSize}px ${fontFace}`;
		return context.measureText(line).width;
	});

	return Math.max(...sizes);
}
