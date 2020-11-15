import { useMemo } from 'react';

import {
	DEFAULT_AREA_DATA,
	DEFAULT_FILL_STYLE,
	DEFAULT_STACK_GROUP_NAME,
	LINES_DISABLED_COLOR,
	NORMALIZED_FILL_STYLE,
	PERCENT_NORMALIZED,
} from '../constants';
import { getCorrectValues } from '../utils';

const usePreparedChartData = ({ data, theme, normalizedGroupType, isStacked, displayLines, displayMarkers }) => {
	return useMemo(() => {
		if (!data || !data.length) return null;

		const statesMode = displayMarkers ? 'markers+lines' : 'lines';
		const sortedData =
			normalizedGroupType === PERCENT_NORMALIZED
				? [...data].reverse()
				: data.sort((firstArea, secondArea) => Math.max(...secondArea.y) - Math.max(...firstArea.y));

		return sortedData.map(({ x, y, fillColor: fillColorFromProps, lineColor: lineColorFromProps, name, marker }) => {
			const fillColor = fillColorFromProps || undefined;
			const lineColor = displayLines ? lineColorFromProps || fillColor : LINES_DISABLED_COLOR;

			return {
				name,
				marker: { symbol: marker },
				fillcolor: fillColor,
				line: { color: lineColor },
				fill: normalizedGroupType === PERCENT_NORMALIZED ? NORMALIZED_FILL_STYLE : DEFAULT_FILL_STYLE,
				stackgroup: isStacked ? DEFAULT_STACK_GROUP_NAME : '',
				groupnorm: normalizedGroupType,
				mode: statesMode,
				...getCorrectValues({ x, y }),
				...DEFAULT_AREA_DATA,
			};
		});
	}, [data, theme, normalizedGroupType, isStacked, displayLines, displayMarkers]);
};

export default usePreparedChartData;
