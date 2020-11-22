import { FillStyle, PERCENT_NORMALIZED } from '../constants';

const getFillStyle = ({ displayFill, normalizedGroupType }) => {
	if (!displayFill) return FillStyle.NONE;
	if (normalizedGroupType === PERCENT_NORMALIZED) return FillStyle.NORMALIZED;
	return FillStyle.AREA;
};

export default getFillStyle;
