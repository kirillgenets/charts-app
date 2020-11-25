import React, { useRef } from 'react';

import propTypes from './propTypes';
import defaultProps from './defaultProps';

import addResizeDetector from '../../hoc/addResizeDetector';

import { useLayout, usePreparedData, useRender, useResize } from './hooks';

const BarChart = ({ data, mode, size }) => {
	if (!data || !data.length) return;

	const chartRef = useRef(null);

	const preparedData = usePreparedData({ data });
	const layout = useLayout({ mode, size });

	useRender({ chartRef, layout, preparedData });
	useResize({ chartRef, layout, size });

	return <div ref={chartRef} className="bar-chart" />;
};

BarChart.propTypes = propTypes;
BarChart.defaultProps = defaultProps;

export default addResizeDetector(BarChart);
