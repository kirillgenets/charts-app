export default {
	legendConfig: {
		isVisible: true,
		orientation: 'vertical',
		hideAndKeepPlace: false,
	},
	isStacked: false,
	displayMarkers: false,
	displayLines: false,
	displayTooltips: true,
	displayFill: true,
	normalizedGroupType: '',
	themeName: 'default',
	xAxis: {
		domain: [],
		label: '',
		displayLine: true,
		displayZeroLine: true,
		displayGridLines: true,
		displayTickLabels: true,
		displayTicks: true,
		displayLabel: true,
		isZoomable: true,
		format: {},
		tickStep: 0,
	},
	yAxis: {
		domain: [],
		label: '',
		displayLine: true,
		displayZeroLine: true,
		displayGridLines: true,
		displayTickLabels: true,
		displayTicks: true,
		displayLabel: true,
		isZoomable: true,
		format: {},
		tickStep: 0,
	},
	decimalSeparator: '',
	thousandSeparator: '',
	displayZoomControls: true,
	onAreaClick: () => {},
	selectedAreas: [],
	enableAreasSelection: false,
	id: 'area-chart',
};
