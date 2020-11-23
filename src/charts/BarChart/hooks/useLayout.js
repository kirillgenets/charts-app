import { useMemo } from 'react';
import _defaultsDeep from 'lodash.defaultsdeep';

import { DEFAULT_LAYOUT } from '../constants';

const useLayout = ({ mode }) => {
	return useMemo(() => {
		return _defaultsDeep({ barmode: mode }, DEFAULT_LAYOUT);
	}, [mode]);
};

export default useLayout;
