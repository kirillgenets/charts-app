import { PERCENT_NORMALIZED } from '../constants';

/**
 * @description Calculates the legend data from the "data" prop or the "items" from the "legendConfig" prop if it is specified
 * @param {object} config
 * @param {object[]} config.preparedData prepared Plotly chart data
 * @param {object} config.legendConfig legend config from props
 * @param {string} config.normalizedGroupType type of chart normalization
 * @returns {object[]} legend data
 */
const getLegendData = ({ preparedData, legendConfig, normalizedGroupType }) => {
  const calculatedLegendData = preparedData.map(({ fillcolor, name, marker: { symbol } }) => ({
    label: name,
    type: symbol,
    color: fillcolor,
  }));

  if (legendConfig.items && legendConfig.items.length > 0) return legendConfig.items;

  return normalizedGroupType === PERCENT_NORMALIZED ? calculatedLegendData.reverse() : calculatedLegendData;
};

export default getLegendData;
