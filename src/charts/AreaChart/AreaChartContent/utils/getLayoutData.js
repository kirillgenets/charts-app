import _defaultsDeep from 'lodash.defaultsdeep';
import {
	X_AXIS_NAME,
	TICKS_OUTSIDE,
	Y_AXIS_NAME,
	DEFAULT_TOOLTIP_FONT_COLOR,
	CATEGORY_TYPE,
	LINEAR_TYPE,
	PERCENT_NORMALIZED,
	MAX_PERCENT_NORMALIZED_Y_AXIS_VALUE,
	TICK_LABEL_GAP,
	HOVER_MODE_ENABLED,
	HOVER_MODE_DISABLED,
	DEFAULT_SEPARATORS,
	DEFAULT_LAYOUT_DATA,
	TICK_LABELS_ROTATE_COEFFICIENT,
} from '../../constants';
import defaultProps from '../defaultProps';
import getTextWidth from '../../../../utils/getTextWidth';

/**
 * @description Defines correct Plotly layout data from specified props
 * @param config
 * @param {object[]} config.data chart data
 * @param {object} config.theme current chart theme
 * @param {object} config.xAxis config for the x-axis
 * @param {object} config.yAxis config for the x-axis
 * @param {string} config.decimalSeparator string that separates decimal and integer parts of the number
 * @param {string} config.thousandSeparator string that separates thousands in the number
 * @param {string} config.normalizedGroupType type of normalization
 * @param {boolean} config.displayTooltips indicates whether tooltips should be displayed or not
 * @returns {object} Plotly layout data
 */
const getLayoutData = ({
	data,
	xAxis,
	yAxis,
	decimalSeparator,
	thousandSeparator,
	normalizedGroupType,
	displayTooltips,
	width,
}) => {
	/**
	 * @description Calculates a count of parts in the number that will be separated with decimal separator
	 * @param {number} value
	 */
	const getValueThousandsCount = (value) => Math.floor(`${value}`.split('').length / 3);

	/**
	 * @description Calculates the max tick label length of the provided axis name
	 * @param {string} axisName name of the axis
	 * @returns {number} max tick label length (width or height depending on orientation)
	 */
	const getMaxAxisTextLength = (axisName) => {
		const { decimalPlaces } = axisName === X_AXIS_NAME ? xAxis.format : yAxis.format;

		if (normalizedGroupType === PERCENT_NORMALIZED && axisName === Y_AXIS_NAME) {
			const { prefix = '', postfix = '' } = yAxis.format;
			return getTextWidth(`${prefix}${MAX_PERCENT_NORMALIZED_Y_AXIS_VALUE.toFixed(decimalPlaces)}${postfix}`);
		}

		return Math.max(
			...data.map((areaData) => {
				return Math.max(
					...areaData[axisName].map((value) => {
						const separators = `${
							thousandSeparator ? new Array(getValueThousandsCount(value)).fill(thousandSeparator).join('') : '' // adding separators to calculate text length correctly
						}${decimalSeparator || ''}`;
						const formattedValue = typeof value === 'number' ? `${value.toFixed(decimalPlaces)}${separators}` : value;

						return getTextWidth(`${formattedValue}`);
					})
				);
			})
		);
	};

	/**
	 * @description Calculates a number of string and numeric values in the current data item
	 * @param {object} item data item
	 * @param {string} axisName name of the axis
	 */
	const getTypedValuesCount = (item, axisName) => ({
		stringValues: item[axisName].filter((value) => typeof value === 'string').length,
		numberValues: item[axisName].filter((value) => typeof value === 'number').length,
	});

	/**
	 * @description Finds out what type of axis is it
	 * @param {string} axisName name of the axis
	 * @returns {string} type of the axis
	 */
	const getAxisType = (axisName) => {
		const stringValuesCount = data.filter((item) => {
			const { stringValues, numberValues } = getTypedValuesCount(item, axisName);
			return Math.max(numberValues, stringValues) === stringValues;
		}).length;

		const numericValuesCount = data.filter((item) => {
			const { stringValues, numberValues } = getTypedValuesCount(item, axisName);
			return Math.max(numberValues, stringValues) === numberValues;
		}).length;

		return Math.max(stringValuesCount, numericValuesCount) === stringValuesCount ? CATEGORY_TYPE : LINEAR_TYPE;
	};

	/**
	 * @description Generates the d3 format rule depending on axis config
	 * @param {object} axisConfig current axis config
	 * @returns {string} d3 format rule
	 */
	const getAxisFormatRule = (axisConfig) => {
		const { decimalPlaces } = axisConfig.format;

		return decimalPlaces || decimalPlaces === 0
			? `${thousandSeparator ? ',' : ''}.${decimalPlaces}f`
			: `${thousandSeparator ? ',' : ''}.`;
	};

	/**
	 * @description Converts x-axis config from props to Plotly xaxis property from layout shape
	 * @returns {object} Plotly xaxis config
	 */
	const getXAxisLayout = () => {
		const combinedAxisProps = _defaultsDeep(xAxis, defaultProps.xAxis);

		return _defaultsDeep({
			showline: combinedAxisProps.displayLine,
			zeroline: combinedAxisProps.displayZeroLine,
			showgrid: combinedAxisProps.displayGridLines,
			showticklabels: combinedAxisProps.displayTickLabels,
			ticks: combinedAxisProps.displayTicks ? TICKS_OUTSIDE : '',
			title: {
				text: combinedAxisProps.displayLabel ? combinedAxisProps.label : '',
			},
			fixedrange: !combinedAxisProps.isZoomable,
			range: combinedAxisProps.domain,
			type: getAxisType(X_AXIS_NAME),
			dtick: xAxis.tickStep,
			tickprefix: xAxis.format.prefix,
			ticksuffix: xAxis.format.postfix,
			tickformat: getAxisFormatRule(xAxis),
		});
	};

	/**
	 * @description Converts y-axis config from props to Plotly yaxis property from layout shape
	 * @returns {object} Plotly yaxis config
	 */
	const getYAxisLayout = () => {
		const combinedAxisProps = _defaultsDeep(yAxis, defaultProps.yAxis);
		const formatRule = getAxisFormatRule(yAxis);

		return _defaultsDeep({
			showline: combinedAxisProps.displayLine,
			zeroline: combinedAxisProps.displayZeroLine,
			showgrid: combinedAxisProps.displayGridLines,
			showticklabels: combinedAxisProps.displayTickLabels,
			ticks: combinedAxisProps.displayTicks ? TICKS_OUTSIDE : '',
			title: {
				text: combinedAxisProps.displayLabel ? combinedAxisProps.label : '',
			},
			fixedrange: !combinedAxisProps.isZoomable,
			range: combinedAxisProps.domain,
			type: getAxisType(Y_AXIS_NAME),
			dtick: yAxis.tickStep,
			tickprefix: yAxis.format.prefix,
			ticksuffix: yAxis.format.postfix,
			hoverformat: formatRule,
			tickformat: formatRule,
		});
	};

	/**
	 * @description Calculates plotly margin values in order to avoid tick labels cut off
	 * @return {object} Plotly layout margin prop
	 */
	const getChartMargin = () => {
		const maxXAxisTextWidth = getMaxAxisTextLength(X_AXIS_NAME) + TICK_LABEL_GAP;
		const maxYAxisTextWidth = getMaxAxisTextLength(Y_AXIS_NAME) + TICK_LABEL_GAP;

		return {
			l: maxYAxisTextWidth,
			b: maxXAxisTextWidth,
			r: (maxXAxisTextWidth / 2) * TICK_LABELS_ROTATE_COEFFICIENT,
		};
	};

	/**
	 * @description Converts tooltip theme data to Plotly hoverlabel from layout shape
	 * @returns {object} Plotly hoverlabel config
	 */
	const getTooltipLayout = () => ({
		font: {
			color: DEFAULT_TOOLTIP_FONT_COLOR,
		},
	});

	const distance = Math.max(
		data[0] && data[0].x ? Math.floor((width - 20) / data[0].x.length) : DEFAULT_LAYOUT_DATA.hoverdistance,
		DEFAULT_LAYOUT_DATA.hoverdistance
	);

	const layout = _defaultsDeep(
		{
			xaxis: getXAxisLayout(),
			yaxis: getYAxisLayout(),
			margin: getChartMargin(),
			hoverlabel: getTooltipLayout(),
			hovermode: displayTooltips ? HOVER_MODE_ENABLED : HOVER_MODE_DISABLED,
			separators:
				decimalSeparator || thousandSeparator ? `${decimalSeparator}${thousandSeparator}` : DEFAULT_SEPARATORS,
		},
		{
			hoverdistance: distance,
			spikedistance: distance,
		},
		DEFAULT_LAYOUT_DATA
	);

	return layout;
};

export default getLayoutData;
