import React from 'react';
import Plotly from 'plotly.js/dist/plotly';
import { shallow, mount } from 'enzyme';

import AreaChartContent from '../AreaChartContent';
import { DefaultTheme } from '../../../../themes';
import Toolbar from '../../../../components/common/Toolbar';

import { shortPreparedData } from '../../mockData';
import {
  TICKS_OUTSIDE,
  DEFAULT_LAYOUT_DATA,
  HOVER_MODE_DISABLED,
  HOVER_MODE_ENABLED,
  DEFAULT_TOOLTIP_FONT_COLOR,
  DEFAULT_SEPARATORS,
  ZOOM_CONTROLS_BACKGROUND_COLOR,
} from '../../constants';

describe('Area Chart | AreaChartContent', () => {
  const renderComponent = (
    {
      data = shortPreparedData,
      xAxis,
      yAxis,
      displayTooltips,
      decimalSeparator,
      thousandSeparator,
      normalizedGroupType,
      theme,
      displayZoomControls,
      onZoomControlClick,
    } = {},
    method = shallow,
  ) =>
    method(
      <AreaChartContent
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        displayTooltips={displayTooltips}
        decimalSeparator={decimalSeparator}
        thousandSeparator={thousandSeparator}
        normalizedGroupType={normalizedGroupType}
        theme={theme}
        displayZoomControls={displayZoomControls}
        onZoomControlClick={onZoomControlClick}
      />,
    );

  it('should be rendered correctly', () => {
    const component = renderComponent();

    expect(component.find('.area-chart__content')).toHaveLength(1);

    expect(component.find(Toolbar)).toHaveLength(1);
    expect(component.find(Toolbar).props().config.backgroundColor).toEqual(ZOOM_CONTROLS_BACKGROUND_COLOR);
  });

  it('should not be rendered when data prop is not provided or if it is an empty array', () => {
    const component = renderComponent();

    expect(component.find('.area-chart__content')).toHaveLength(1);

    component.setProps({ data: [] });
    expect(component.find('.area-chart__content')).toHaveLength(0);

    component.setProps({ data: null });
    expect(component.find('.area-chart__content')).toHaveLength(0);
  });

  it('should calculate correct x-axis config for the Plotly layout', () => {
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    const titleFontConfig = {
      family: DefaultTheme.axis.style.axisLabel.fontFamily,
      size: DefaultTheme.axis.style.axisLabel.fontSize,
      color: DefaultTheme.axis.style.axisLabel.fill,
    };
    const tickFontConfig = {
      family: DefaultTheme.axis.style.tickLabels.fontFamily,
      size: DefaultTheme.axis.style.tickLabels.fontSize,
      color: DefaultTheme.axis.style.tickLabels.fill,
    };
    const label = 'test';
    const component = renderComponent(
      {
        xAxis: {
          label,
        },
      },
      mount,
    );

    expect(plotlyReactSpy.mock.calls[0][2].xaxis).toMatchObject({
      ...DEFAULT_LAYOUT_DATA.xaxis,
      showline: true,
      zeroline: true,
      showgrid: true,
      showticklabels: true,
      ticks: TICKS_OUTSIDE,
      title: {
        text: label,
        font: titleFontConfig,
      },
      fixedrange: false,
      tickfont: tickFontConfig,
      linecolor: DefaultTheme.axis.style.axis.stroke,
      gridcolor: DefaultTheme.axis.style.grid.stroke,
      tickcolor: DefaultTheme.axis.style.ticks.stroke,
      ticklen: DefaultTheme.axis.style.ticks.size,
      type: 'category',
      tickprefix: undefined,
      ticksuffix: undefined,
      tickformat: '.',
    });

    component.setProps({
      xAxis: {
        label,
        displayLine: false,
        displayZeroLine: false,
        displayGridLines: false,
        displayTickLabels: false,
        displayTicks: false,
        displayLabel: false,
        isZoomable: false,
        format: {
          prefix: label,
          postfix: label,
          decimalPlaces: 4,
        },
      },
      decimalSeparator: ',',
      thousandSeparator: '.',
    });

    expect(plotlyReactSpy.mock.calls[2][2].xaxis).toMatchObject({
      ...DEFAULT_LAYOUT_DATA.xaxis,
      showline: false,
      zeroline: false,
      showgrid: false,
      showticklabels: false,
      ticks: '',
      title: {
        text: '',
        font: titleFontConfig,
      },
      fixedrange: true,
      tickfont: tickFontConfig,
      linecolor: DefaultTheme.axis.style.axis.stroke,
      gridcolor: DefaultTheme.axis.style.grid.stroke,
      tickcolor: DefaultTheme.axis.style.ticks.stroke,
      ticklen: DefaultTheme.axis.style.ticks.size,
      type: 'category',
      tickprefix: label,
      ticksuffix: label,
      tickformat: ',.4f',
    });
  });

  it('should calculate correct y-axis config for the Plotly layout', () => {
    jest.clearAllMocks();
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    const titleFontConfig = {
      family: DefaultTheme.axis.style.axisLabel.fontFamily,
      size: DefaultTheme.axis.style.axisLabel.fontSize,
      color: DefaultTheme.axis.style.axisLabel.fill,
    };
    const tickFontConfig = {
      family: DefaultTheme.axis.style.tickLabels.fontFamily,
      size: DefaultTheme.axis.style.tickLabels.fontSize,
      color: DefaultTheme.axis.style.tickLabels.fill,
    };
    const label = 'test';
    const component = renderComponent(
      {
        yAxis: {
          label,
        },
      },
      mount,
    );

    expect(plotlyReactSpy.mock.calls[0][2].yaxis).toMatchObject({
      ...DEFAULT_LAYOUT_DATA.yaxis,
      showline: true,
      zeroline: true,
      showgrid: true,
      showticklabels: true,
      ticks: TICKS_OUTSIDE,
      title: {
        text: label,
        font: titleFontConfig,
      },
      fixedrange: false,
      tickfont: tickFontConfig,
      linecolor: DefaultTheme.axis.style.axis.stroke,
      gridcolor: DefaultTheme.axis.style.grid.stroke,
      tickcolor: DefaultTheme.axis.style.ticks.stroke,
      ticklen: DefaultTheme.axis.style.ticks.size,
      type: 'linear',
      tickprefix: undefined,
      ticksuffix: undefined,
      tickformat: '.',
      hoverformat: '.',
    });

    component.setProps({
      yAxis: {
        label,
        displayLine: false,
        displayZeroLine: false,
        displayGridLines: false,
        displayTickLabels: false,
        displayTicks: false,
        displayLabel: false,
        isZoomable: false,
        format: {
          prefix: label,
          postfix: label,
          decimalPlaces: 4,
        },
      },
      decimalSeparator: ',',
      thousandSeparator: '.',
    });

    expect(plotlyReactSpy.mock.calls[2][2].yaxis).toMatchObject({
      ...DEFAULT_LAYOUT_DATA.yaxis,
      showline: false,
      zeroline: false,
      showgrid: false,
      showticklabels: false,
      ticks: '',
      title: {
        text: '',
        font: titleFontConfig,
      },
      fixedrange: true,
      tickfont: tickFontConfig,
      linecolor: DefaultTheme.axis.style.axis.stroke,
      gridcolor: DefaultTheme.axis.style.grid.stroke,
      tickcolor: DefaultTheme.axis.style.ticks.stroke,
      ticklen: DefaultTheme.axis.style.ticks.size,
      type: 'linear',
      tickprefix: label,
      ticksuffix: label,
      tickformat: ',.4f',
      hoverformat: ',.4f',
    });

    component.setProps({
      thousandSeparator: null,
    });

    expect(plotlyReactSpy.mock.calls[3][2].yaxis.tickformat).toBe('.4f');

    expect(plotlyReactSpy.mock.calls[3][2].yaxis.hoverformat).toBe('.4f');
  });

  it('should set a correct "hovermode" property to Plotly layout', () => {
    jest.clearAllMocks();
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    const component = renderComponent({}, mount);

    expect(plotlyReactSpy.mock.calls[0][2].hovermode).toEqual(HOVER_MODE_ENABLED);
    component.setProps({ displayTooltips: false });
    expect(plotlyReactSpy.mock.calls[2][2].hovermode).toEqual(HOVER_MODE_DISABLED);
  });

  it('should set a correct "hoverlabel" property to Plotly layout', () => {
    jest.clearAllMocks();
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    renderComponent({}, mount);

    expect(plotlyReactSpy.mock.calls[0][2].hoverlabel).toEqual({
      bordercolor: DefaultTheme.axis.style.axis.stroke,
      font: {
        family: DefaultTheme.tooltip.fontFamily,
        size: DefaultTheme.tooltip.fontSize,
        color: DEFAULT_TOOLTIP_FONT_COLOR,
      },
    });
  });

  it('should set a correct "separators" property to Plotly layout', () => {
    jest.clearAllMocks();
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    const thousandSeparator = '1';
    const decimalSeparator = '2';
    const component = renderComponent({}, mount);

    expect(plotlyReactSpy.mock.calls[0][2].separators).toEqual(DEFAULT_SEPARATORS);
    component.setProps({ thousandSeparator, decimalSeparator });
    expect(plotlyReactSpy.mock.calls[2][2].separators).toEqual(`${decimalSeparator}${thousandSeparator}`);
  });

  it('should set correct margins for the chart', () => {
    jest.clearAllMocks();
    const plotlyReactSpy = jest.spyOn(Plotly, 'react');
    const component = renderComponent({}, mount);

    expect(plotlyReactSpy.mock.calls[0][2].margin).toEqual({ ...DEFAULT_LAYOUT_DATA.margin, r: 26.25, l: 35, b: 35 });
    component.setProps({ isStacked: true, normalizedGroupType: 'percent' });
    expect(plotlyReactSpy.mock.calls[1][2].margin).toEqual({ ...DEFAULT_LAYOUT_DATA.margin, r: 26.25, l: 35, b: 35 });
  });

  it('zoom controls should not be rendered when the "disableZoomControls" is set to false', () => {
    const component = renderComponent({ displayZoomControls: false });
    expect(component.find(Toolbar)).toHaveLength(0);
  });

  it('zoom controls should work correctly', () => {
    const onZoomControlClick = jest.fn();
    const component = renderComponent({ onZoomControlClick }, mount);

    component
      .find('.area-chart__zoom-controls button')
      .at(0)
      .simulate('click');
    expect(onZoomControlClick).toHaveBeenCalled();

    component
      .find('.area-chart__zoom-controls button')
      .at(1)
      .simulate('click');
    expect(onZoomControlClick).toHaveBeenCalled();

    component
      .find('.area-chart__zoom-controls button')
      .at(2)
      .simulate('click');
    expect(onZoomControlClick).toHaveBeenCalled();
  });
});
