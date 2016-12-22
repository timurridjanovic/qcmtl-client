import * as navigationActions from '../navigation';
import * as routes from '../../routes';

const { OFFER_RIDE } = navigationActions;

export const RIDE_CREATION = 'RIDE_CREATION';

console.log('ROUTES_MAIN: ', routes);

export function goToLocationPage(props) {
  return dispatch => {
    dispatch(navigationActions.push(OFFER_RIDE, routes.SELECT_LOCATION, props));
  };
}

export function resetToRideCreation() {
  return dispatch => {
    dispatch(navigationActions.replace(OFFER_RIDE, routes.OFFER_RIDE));
  };
}

export function success(ride) {
  return dispatch => {
    dispatch({ type: RIDE_CREATION, ride });
    dispatch(navigationActions.reset(OFFER_RIDE, routes.RIDE_CREATION_SUCCESS));
  };
}
