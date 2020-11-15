import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js/dist/plotly';

import propTypes from './propTypes';
import defaultProps from './defaultProps';
import contextTypes from './contextTypes';

import { DEFAULT_OPTIONS } from '../constants';

import { getLayoutData, addSelectedAreasToData } from './utils';

import './style.css';

const AreaChartContent = ({
	data,
	theme,
	xAxis,
	yAxis,
	decimalSeparator,
	thousandSeparator,
	normalizedGroupType,
	displayTooltips,
	displayZoomControls,
	onZoomControlClick,
	onAreaClick,
	selectedAreas: selectedAreasFromProps,
	id,
	enableAreasSelection,
}) => {
	const chartRef = useRef(null);

	// mount + update
	useEffect(() => {
		const renderChart = () => {
			const currentLayout = getLayoutData({
				data,
				xAxis,
				yAxis,
				theme,
				decimalSeparator,
				thousandSeparator,
				normalizedGroupType,
				displayTooltips,
				width: 800,
				height: 800,
			});

			Plotly.react(
				chartRef.current,
				addSelectedAreasToData({ data, normalizedGroupType }),
				currentLayout,
				DEFAULT_OPTIONS
			);
		};

		renderChart();
	}, [
		data,
		theme,
		xAxis,
		yAxis,
		decimalSeparator,
		thousandSeparator,
		normalizedGroupType,
		displayTooltips,
		// chartWidth,
		// chartHeight,
	]);

	// useEffect(() => {
	// 	const updateChartSize = (width, height) => {
	// 		Plotly.relayout(chartRef.current, { width, height });
	// 	};

	// 	if (chartWidth !== 0 && chartHeight !== 0) {
	// 		updateChartSize(chartWidth, chartHeight);
	// 	}
	// }, [chartWidth, chartHeight]);

	if (!data || data.length < 1) return null;

	return (
		<div id={id} className="area-chart__content">
			<div className="area-chart__plot" ref={chartRef} />
		</div>
	);
};

AreaChartContent.contextTypes = contextTypes;
AreaChartContent.propTypes = propTypes;
AreaChartContent.defaultProps = defaultProps;

export default AreaChartContent;
