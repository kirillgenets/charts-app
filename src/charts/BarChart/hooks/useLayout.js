import { useMemo } from 'react';
import _defaultsDeep from 'lodash.defaultsdeep';

import { DEFAULT_LAYOUT } from '../constants';

const useLayout = ({ mode, size }) => {
	return useMemo(() => {
		return _defaultsDeep({ ...size, barmode: mode }, DEFAULT_LAYOUT);
	}, [mode, size.width, size.height]);
};

export default useLayout;
