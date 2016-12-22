export const SET_LOCATIONS = 'SET_LOCATIONS';

export function setLocations(locations) {
  const { pickUp, dropOff } = locations;
  return dispatch => dispatch({ type: SET_LOCATIONS, pickUp, dropOff });
}
