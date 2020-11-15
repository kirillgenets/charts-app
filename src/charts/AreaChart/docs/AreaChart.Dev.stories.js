import React from 'react';
import { storiesOf } from '@storybook/react';
import AreaChart from '../AreaChart';
import { shortData, shortDataWithLinesColor, dataWithManyStates, dataWithManyStatesAndColors } from '../mockData';

storiesOf('Area Chart', module)
	.add('Example', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} displayZoomControls={false} />
		</div>
	))
	.add('Without legend', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} legendConfig={{ isVisible: false }} />
		</div>
	))
	.add('With lines and markers', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortDataWithLinesColor} displayLines={true} displayMarkers={true} />
		</div>
	))
	.add('Without zero axes lines', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} xAxis={{ displayZeroLine: false }} yAxis={{ displayZeroLine: false }} />
		</div>
	))
	.add('Without grid lines', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} xAxis={{ displayGridLines: false }} yAxis={{ displayGridLines: false }} />
		</div>
	))
	.add('Without tick lines', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} xAxis={{ displayTicks: false }} yAxis={{ displayTicks: false }} />
		</div>
	))
	.add('Without tick labels', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} xAxis={{ displayTickLabels: false }} yAxis={{ displayTickLabels: false }} />
		</div>
	))
	.add('With axes labels', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} xAxis={{ label: 'X-Axis' }} yAxis={{ label: 'Y-Axis' }} />
		</div>
	))
	.add('With disabled zoom for the y-axis', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} yAxis={{ isZoomable: false }} />
		</div>
	))
	.add('With fixed domain for the y-axis', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} yAxis={{ domain: [-10, 30] }} />
		</div>
	))
	.add('Without tooltips', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={shortData} displayTooltips={false} />
		</div>
	))
	.add('With many states', () => (
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
	.add('With many states and specified colors', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart data={dataWithManyStatesAndColors} yAxis={{ isZoomable: false }} />
		</div>
	))
	.add('Lasagna (Stacked + Percent Normalized)', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart
				data={shortData}
				isStacked={true}
				normalizedGroupType="percent"
				yAxis={{
					isZoomable: false,
					label: 'Unmet need states',
					format: {
						prefix: '%',
					},
				}}
				xAxis={{ label: 'Dates' }}
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
				themeName="MDS"
			/>
		</div>
	))
	.add('Lasagna with 10 tick step', () => (
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
					tickStep: 10,
				}}
				themeName="MDS"
			/>
		</div>
	))
	.add('Lasagna with many states and specified colors', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<AreaChart
				data={dataWithManyStatesAndColors}
				isStacked={true}
				normalizedGroupType="percent"
				yAxis={{
					isZoomable: false,
					format: {
						postfix: '%',
						decimalPlaces: 2,
					},
				}}
				xAxis={{
					label: 'Regions',
				}}
				selectedAreas={['Belgium, Distribution', 'Denmark, Distribution', 'Finland, Distribution']}
				onAreaClick={(data) => {
					console.log('data', data);
				}}
				enableAreasSelection={true}
			/>
		</div>
	));
