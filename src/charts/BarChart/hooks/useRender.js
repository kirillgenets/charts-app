import { useEffect } from 'react';
import Plotly from 'plotly.js/dist/plotly';

import { DEFAULT_OPTIONS } from '../constants';

const useRender = ({ preparedData, layout, chartRef }) => {
	console.log('useRender -> layout', layout);
	return useEffect(() => {
		Plotly.react(chartRef.current, preparedData, layout, DEFAULT_OPTIONS);
	}, [preparedData, layout, chartRef.current]);
};

export default useRender;
