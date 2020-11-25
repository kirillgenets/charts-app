export const DEFAULT_LAYOUT_DATA = {
	showlegend: true,
	xaxis: {
		showspikes: true,
		spikemode: 'toaxis+across',
		spikedash: 'solid',
		spikecolor: '#ffffff',
		automargin: true,
	},
	hoverdistance: 200,
	spikedistance: 200,
	autosize: false,
	dragmode: 'pan',
	margin: {
		t: 0,
		r: 100,
	},
};

export const DEFAULT_OPTIONS = {
	scrollZoom: true,
	displayModeBar: true,
	responsive: true,
};

export const DEFAULT_AREA_DATA = {
	hoverinfo: 'y+name',
	hovertemplate: '%{y}',
	type: 'scatter',
};

export const FillStyle = {
	NORMALIZED: 'tonexty',
	AREA: 'tozeroy',
	NONE: 'none',
};

export const NORMALIZED_FILL_STYLE = 'tonexty';

export const DEFAULT_FILL_STYLE = 'none';

export const DEFAULT_STACK_GROUP_NAME = 'lasagna';

export const MAX_PERCENT_NORMALIZED_Y_AXIS_VALUE = 100;

export const LINEAR_TYPE = 'linear';

export const CATEGORY_TYPE = 'category';

export const TICK_LABEL_GAP = 35;

export const DEFAULT_TOOLTIP_FONT_COLOR = '#ffffff';

export const HOVER_MODE_DISABLED = false;

export const HOVER_MODE_ENABLED = 'x';

export const PERCENT_NORMALIZED = 'percent';

export const X_AXIS_NAME = 'x';

export const Y_AXIS_NAME = 'y';

export const NOT_AVAILABLE_VALUE = 'N/A';

export const DEFAULT_SEPARATORS = '.,';

export const DEFAULT_CHART_FRAME_RENDER_METHOD = 'front';

export const TICKS_OUTSIDE = 'outside';

export const TICK_LABELS_ROTATE_COEFFICIENT = 1.5;

export const SELECTED_COLOR = '#000000';

export const LINES_DISABLED_COLOR = 'transparent';
