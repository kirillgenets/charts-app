import { useMemo } from 'react';

import { ColorsIterator } from '../../../utils';

import { PLOTLY_CHART_TYPE } from '../constants';
import { DEFAULT_CHART_COLORS } from '../../../constants';

const usePreparedData = ({ data }) => {
	return useMemo(() => {
		const colors = new ColorsIterator(DEFAULT_CHART_COLORS);

		return data.map(({ fillColor, lineColor, ...rest }) => ({
			...rest,
			type: PLOTLY_CHART_TYPE,
			marker: {
				color: fillColor || colors.next(),
				...(lineColor ? { line: { color: lineColor } } : {}),
			},
		}));
	}, [data]);
};

export default usePreparedData;
