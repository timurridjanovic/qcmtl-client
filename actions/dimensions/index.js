export const SET_DIMENSIONS = 'SET_DIMENSIONS';

export function setDimensions(dimensions) {
  const width = dimensions.width;
  const height = dimensions.height;
  return dispatch => dispatch({ type: SET_DIMENSIONS, width, height });
}
