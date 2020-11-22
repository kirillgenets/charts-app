import { useMemo } from 'react';
import { ColorsIterator } from '../../../utils';

import {
	DEFAULT_AREA_DATA,
	DEFAULT_CHART_COLORS,
	DEFAULT_STACK_GROUP_NAME,
	LINES_DISABLED_COLOR,
	PERCENT_NORMALIZED,
} from '../constants';
import { getCorrectValues, getFillStyle } from '../utils';

const usePreparedChartData = ({
	data,
	theme,
	normalizedGroupType,
	isStacked,
	displayLines,
	displayMarkers,
	displayFill,
}) => {
	return useMemo(() => {
		if (!data || !data.length) return null;

		const statesMode = displayMarkers ? 'markers+lines' : 'lines';
		const sortedData =
			normalizedGroupType === PERCENT_NORMALIZED
				? [...data].reverse()
				: data.sort((firstArea, secondArea) => Math.max(...secondArea.y) - Math.max(...firstArea.y));

		const colors = new ColorsIterator(DEFAULT_CHART_COLORS);

		return sortedData.map(({ x, y, fillColor: fillColorFromProps, lineColor: lineColorFromProps, name, marker }) => {
			const fillColor = fillColorFromProps || colors.next();
			const lineColor = displayLines ? lineColorFromProps || fillColor : LINES_DISABLED_COLOR;

			return {
				name,
				marker: { symbol: marker },
				fillcolor: fillColor,
				line: { color: lineColor },
				fill: getFillStyle({ displayFill, normalizedGroupType }),
				stackgroup: isStacked ? DEFAULT_STACK_GROUP_NAME : '',
				groupnorm: normalizedGroupType,
				mode: statesMode,
				...getCorrectValues({ x, y }),
				...DEFAULT_AREA_DATA,
			};
		});
	}, [data, theme, normalizedGroupType, isStacked, displayLines, displayMarkers, displayFill]);
};

export default usePreparedChartData;
