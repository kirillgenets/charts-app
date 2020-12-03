import React from 'react';
import { storiesOf } from '@storybook/react';

import BarChart from '../BarChart';

import { customizedData, shortData } from '../mockData';

storiesOf('Bar Chart', module)
	.add('Example', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<BarChart data={shortData} />
		</div>
	))
	.add('Stacked', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<BarChart data={shortData} mode="stack" />
		</div>
	))
	.add('Customized', () => (
		<div style={{ height: '100%', width: '100%' }}>
			<BarChart data={customizedData} />
		</div>
	));
