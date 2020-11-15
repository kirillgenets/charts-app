/**
 * @description Convert absolute value to percent normalized value
 * @param {object} config
 * @param {number} config.value value that needs to be converted
 * @param {object[]} config.data prepared chart data
 * @param {number} config.index index of value in chart data
 * @returns {number} percent value
 */
const getPercentYValue = ({ data, value, index }) => {
  const valuesSum = data.reduce((sum, { y }) => sum + y[index], 0);
  return (100 * value) / valuesSum;
};

export default getPercentYValue;
