import PropTypes from 'prop-types';

export default {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			x: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string, PropTypes.number)),
			y: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.string, PropTypes.number)),
			name: PropTypes.string,
			width: PropTypes.number,
			fillColor: PropTypes.string,
			lineColor: PropTypes.string,
		})
	).isRequired,
	mode: PropTypes.oneOf(['', 'stack', 'group', 'overlay', 'relative']),
};
