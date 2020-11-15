import PropTypes from 'prop-types';

const formattingShape = PropTypes.shape({
	decimalPlaces: PropTypes.number, // Length of the decimal part in the number
	prefix: PropTypes.string, // String, that is placed before the value
	postfix: PropTypes.string, // String, that is placed after the value
});

export const axisPropType = PropTypes.shape({
	domain: PropTypes.arrayOf(PropTypes.number), // Min and max value of the axis. For example: [0, 100]. If it is not specified, the domain will be calculated automatically
	label: PropTypes.string, // Label for the axis
	displayLine: PropTypes.bool, // Indicates whether the axis line should be displayed or not
	displayZeroLine: PropTypes.bool, // Indicates whether the extra axis line should be displayed at zero point or not
	displayGridLines: PropTypes.bool, // Indicates whether the grid lines for the axis should be enabled or not
	displayTickLabels: PropTypes.bool, // Indicated whether the axis tick labels should be displayed or not
	displayTicks: PropTypes.bool, // Indidates whether the axis ticks should be visible or not,
	displayLabel: PropTypes.bool, // Indicates whether the axis label should be displayed or not
	isZoomable: PropTypes.bool, // Indicates whether zoom for the current axis should be enabled or not
	format: formattingShape, // Through this property you can format axis tick labels
	tickStep: PropTypes.number, // For numeric axis it represents the step between axis tick values. For axis with string values it shows which labels should be shown with initial zoom, for example, with tickStep `1` all tick values will be shown, with tickStep `2` each second will be shown
});

export default {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string, // Name of the current item that will be displayed in the legend
			// marker: PropTypes.oneOf(SHAPES), // Type of the marker that will be displayed in the legend
			x: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.number, PropTypes.string)).isRequired, // X-axis positions of the points
			y: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.number, PropTypes.string)).isRequired, // Y-axis positions of the points
			fillColor: PropTypes.string, // A color of the area
			lineColor: PropTypes.string, // A color of the area border
		})
	).isRequired, // An array of points data, that will be rendered as areas borders
	legendConfig: PropTypes.shape({
		isVisible: PropTypes.bool, // Indicates whether the legend should be rendered or not
		orientation: PropTypes.oneOf(['vertical', 'horizontal', 'horizontal-left']), // Indicates in which positio chart must be rendered
		// items: legendDataTypes, // A list of items, that will be rendered in the legend. If it is not specified, the legend items data will be calculated automatically
		hideAndKeepPlace: PropTypes.bool, // Indicates that legend should be invisible but keep its place
	}), // Config for legend customizing
	isStacked: PropTypes.bool, // Indicates whether the chart should be stacked or not
	normalizedGroupType: PropTypes.oneOf(['', 'percent', 'fraction']), // The type of group normalization. For more info: https://plotly.com/python/reference/#scatter-groupnorm
	displayMarkers: PropTypes.bool, // Indicates whether the markers should be displayed or not
	displayLines: PropTypes.bool, // Indicates whether the lines should be displayed or not
	displayTooltips: PropTypes.bool, // Indicates whether tooltips should be visible or not
	xAxis: axisPropType, // Config for the x-axis
	yAxis: axisPropType, // Config for the y-axis
	decimalSeparator: PropTypes.string, // String, that separates decimal and integer parts of the number
	thousandSeparator: PropTypes.string, // String, that separates thousands
	themeName: PropTypes.string, // Name of the chart theme
	displayZoomControls: PropTypes.bool, // Indicates whether zoom controls should be shown or not
	onAreaClick: PropTypes.func, // Callback that is called on any area click
	selectedAreas: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.string),
		PropTypes.arrayOf(PropTypes.object),
		PropTypes.object,
	]), // A list of selected areas data
	enableAreasSelection: PropTypes.bool, // Indicates whether areas selection on click should be enabled or not
	id: PropTypes.string, // Chart id
};
