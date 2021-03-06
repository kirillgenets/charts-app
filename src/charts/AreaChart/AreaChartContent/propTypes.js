import PropTypes from 'prop-types';
import { axisPropType } from '../propTypes';

export default {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			x: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.number, PropTypes.string)),
			y: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.number, PropTypes.string)),
			marker: PropTypes.shape({
				// symbol: PropTypes.oneOf(SHAPES),
			}),
			fillcolor: PropTypes.string,
			line: PropTypes.shape({
				color: PropTypes.string,
			}),
			fill: PropTypes.string,
			type: PropTypes.string,
			stackgroup: PropTypes.string,
			groupnorm: PropTypes.string,
			hoverinfo: PropTypes.string,
			mode: PropTypes.string,
		})
	).isRequired, // An array of points data, that will be rendered as areas borders
	xAxis: axisPropType, // Config for the x-axis
	yAxis: axisPropType, // Config for the y-axis
	displayTooltips: PropTypes.bool, // Indicates whether tooltips should be visible or not
	decimalSeparator: PropTypes.string, // String, that separates decimal and integer parts of the number
	thousandSeparator: PropTypes.string, // String, that separates thousands
	normalizedGroupType: PropTypes.oneOf(['', 'percent', 'fraction']), // The type of group normalization. For more info: https://plotly.com/python/reference/#scatter-groupnorm
	theme: PropTypes.object, // Style config for the chart
	id: PropTypes.string, // Chart id
	size: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
	}),
};
