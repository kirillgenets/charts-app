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
	const getValueThousandsCount = (value) => Math.floor(`${value}`.split('').length / 3);

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

	const getTypedValuesCount = (item, axisName) => ({
		stringValues: item[axisName].filter((value) => typeof value === 'string').length,
		numberValues: item[axisName].filter((value) => typeof value === 'number').length,
	});

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

	const getAxisFormatRule = (axisConfig) => {
		const { decimalPlaces } = axisConfig.format;

		return decimalPlaces || decimalPlaces === 0
			? `${thousandSeparator ? ',' : ''}.${decimalPlaces}f`
			: `${thousandSeparator ? ',' : ''}.`;
	};

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

	const getChartMargin = () => {
		const maxXAxisTextWidth = getMaxAxisTextLength(X_AXIS_NAME) + TICK_LABEL_GAP;
		const maxYAxisTextWidth = getMaxAxisTextLength(Y_AXIS_NAME) + TICK_LABEL_GAP;

		return {
			l: maxYAxisTextWidth,
			b: maxXAxisTextWidth,
			r: (maxXAxisTextWidth / 2) * TICK_LABELS_ROTATE_COEFFICIENT,
		};
	};

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
