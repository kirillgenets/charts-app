import _cloneDeep from 'lodash.clonedeep';

import { NOT_AVAILABLE_VALUE } from '../constants';

const getCorrectValues = ({ x: originalX, y: originalY }) => {
	const xClone = _cloneDeep(originalX);
	const yClone = _cloneDeep(originalY);

	return {
		x: xClone.filter((value, index) => yClone[index] !== NOT_AVAILABLE_VALUE),
		y: yClone.filter((value) => value !== NOT_AVAILABLE_VALUE),
	};
};

export default getCorrectValues;
