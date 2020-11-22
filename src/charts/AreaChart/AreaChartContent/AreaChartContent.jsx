import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js/dist/plotly';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

import { DEFAULT_OPTIONS } from '../constants';

import { getLayoutData } from './utils';

import './style.css';

const AreaChartContent = ({
	data,
	xAxis,
	yAxis,
	decimalSeparator,
	thousandSeparator,
	normalizedGroupType,
	displayTooltips,
	id,
	size,
}) => {
	const chartRef = useRef(null);

	useEffect(() => {
		const renderChart = () => {
			const currentLayout = getLayoutData({
				data,
				xAxis,
				yAxis,
				decimalSeparator,
				thousandSeparator,
				normalizedGroupType,
				displayTooltips,
				width: size.width,
			});

			Plotly.react(chartRef.current, data, currentLayout, DEFAULT_OPTIONS);
		};

		renderChart();
	}, [
		data,
		xAxis,
		yAxis,
		decimalSeparator,
		thousandSeparator,
		normalizedGroupType,
		displayTooltips,
		size.width,
		size.height,
	]);

	useEffect(() => {
		const updateChartSize = (width, height) => {
			Plotly.relayout(chartRef.current, {
				width,
				height,
				...getLayoutData({
					data,
					xAxis,
					yAxis,
					decimalSeparator,
					thousandSeparator,
					normalizedGroupType,
					displayTooltips,
					width: size.width,
				}),
			});
		};
		if (size.width !== 0 && size.height !== 0) {
			updateChartSize(size.width, size.height);
		}
	}, [size.width, size.height]);

	if (!data || data.length < 1) return null;

	return (
		<div id={id} className="area-chart__content">
			<div className="area-chart__plot" ref={chartRef} />
		</div>
	);
};

AreaChartContent.propTypes = propTypes;
AreaChartContent.defaultProps = defaultProps;

export default AreaChartContent;
