import React, { useEffect, useRef, useState, Fragment } from 'react';
import _debounce from 'lodash.debounce';
import ElementResizeDetector from 'element-resize-detector';

import { RESIZE_DEBOUNCE_TIMEOUT } from './constants';

import './style.css';

const addResizeDetector = (Component) => (props) => {
	const detectorRef = useRef(null);
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const resizeDetector = new ElementResizeDetector();
		resizeDetector.listenTo(
			detectorRef.current,
			_debounce(() => {
				if (size.width === detectorRef.current.clientWidth && size.height === detectorRef.current.clientHeight) return;

				setSize({
					width: detectorRef.current.clientWidth,
					height: detectorRef.current.clientHeight,
				});
			}, RESIZE_DEBOUNCE_TIMEOUT)
		);
	}, []);

	return (
		<Fragment>
			<div className="resize-detector" ref={detectorRef} />
			<Component {...props} size={size} />
		</Fragment>
	);
};

export default addResizeDetector;
