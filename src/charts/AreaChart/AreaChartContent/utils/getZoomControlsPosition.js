import { ZOOM_CONTROLS_POSITION } from '../../constants';

/**
 * @description Calculates zoom controls position depending on chart margins from layout
 * @param {object} layout
 */
const getZoomControlsPosition = ({ margin: { r } = {} }) => ({
  ...ZOOM_CONTROLS_POSITION,
  right: r,
});

export default getZoomControlsPosition;
