export const PLOTLY_CHART_TYPE = 'bar';
export const DEFAULT_OPTIONS = {
	scrollZoom: true,
	displayModeBar: true,
	responsive: true,
};
export const DEFAULT_LAYOUT = {
	showlegend: true,
	xaxis: {
		showline: true,
		showspikes: true,
		spikemode: 'toaxis+across',
		spikedash: 'solid',
		spikecolor: '#ffffff',
		automargin: true,
	},
	yaxis: {
		showline: true,
	},
	hoverdistance: 200,
	spikedistance: 200,
	autosize: false,
	dragmode: 'pan',
	margin: {
		t: 0,
		l: 50,
		r: 200,
		b: 100,
	},
};
