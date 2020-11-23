import { useEffect } from 'react';
import Plotly from 'plotly.js/dist/plotly';

const useResize = ({ size, layout, chartRef }) => {
	return useEffect(() => {
		if (!size.width || !size.height) return;
		Plotly.relayout(chartRef.current, { ...layout, ...size });
	}, [size.width, size.height]);
};

export default useResize;
