import React from 'react';
import { storiesOf } from '@storybook/react';
import AreaChart from '../AreaChart';
import { shortData, shortDataWithLinesColor, dataWithManyStates, dataWithManyStatesAndColors } from '../mockData';

storiesOf('Area Chart + Line Chart + Lasagna Chart', module)
	.add('Area Chart', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} displayZoomControls={false} displayLines={true} />
		</div>
	))
	.add('Area Chart with many states', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart
				data={dataWithManyStates}
				yAxis={{
					isZoomable: false,
					format: {
						prefix: '$',
						postfix: 'k',
						decimalPlaces: 4,
					},
				}}
				decimalSeparator=","
				thousandSeparator="."
			/>
		</div>
	))
	.add('Without fill (Line Chart)', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart
				data={shortData}
				yAxis={{
					isZoomable: false,
					format: {
						prefix: '$',
						postfix: 'k',
						decimalPlaces: 4,
					},
				}}
				displayFill={false}
				displayLines={true}
				displayMarkers={true}
			/>
		</div>
	))
	.add('Lasagna with many states', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart
				data={dataWithManyStates}
				isStacked={true}
				normalizedGroupType="percent"
				yAxis={{
					isZoomable: false,
					format: {
						postfix: '%',
					},
				}}
			/>
		</div>
	));
