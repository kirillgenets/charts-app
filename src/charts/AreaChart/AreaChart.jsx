import React from 'react';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

import AreaChartContent from './AreaChartContent';

// import { getLegendData } from './utils';
import { usePreparedChartData } from './hooks';

import './style.css';

const AreaChart = ({
	data,
	isStacked,
	decimalSeparator,
	thousandSeparator,
	normalizedGroupType,
	displayMarkers,
	displayLines,
	displayTooltips,
	xAxis,
	yAxis,
	theme,
	id,
}) => {
	const preparedData = usePreparedChartData({
		data,
		theme,
		normalizedGroupType,
		isStacked,
		displayLines,
		displayMarkers,
	});

	if (!data || data.length < 1) return null;

	return (
		<div className="area-chart__wrapper">
			<AreaChartContent
				theme={theme}
				data={preparedData}
				xAxis={xAxis}
				yAxis={yAxis}
				decimalSeparator={decimalSeparator}
				thousandSeparator={thousandSeparator}
				normalizedGroupType={normalizedGroupType}
				displayTooltips={displayTooltips}
				id={id}
			/>
		</div>
	);
};

AreaChart.propTypes = propTypes;
AreaChart.defaultProps = defaultProps;

export default AreaChart;
