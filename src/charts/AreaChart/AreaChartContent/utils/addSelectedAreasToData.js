import { SELECTED_COLOR, PERCENT_NORMALIZED } from '../../constants';

const addSelectedAreasToData = ({ data, selectedAreas, normalizedGroupType }) => {
  const isAreaSelected = ({ name, index }) =>
    selectedAreas &&
    (selectedAreas.findIndex(areaData => areaData && areaData.name === name) !== -1 ||
      (normalizedGroupType === PERCENT_NORMALIZED &&
        selectedAreas.findIndex(areaData => {
          const nextArea = data[index + 1];
          return nextArea && areaData && areaData.name === nextArea.name;
        }) !== -1));

  return data.map((areaData, index) => ({
    ...areaData,
    line: { color: isAreaSelected({ name: areaData.name, index }) ? SELECTED_COLOR : areaData.line.color },
  }));
};

export default addSelectedAreasToData;
