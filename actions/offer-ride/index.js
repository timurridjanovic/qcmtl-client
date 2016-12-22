import * as navigationActions from '../navigation';
import * as routes from '../../routes';

const { OFFER_RIDE } = navigationActions;

export function goToLocationPage(props) {
  return dispatch => {
    dispatch(navigationActions.push(OFFER_RIDE, routes.SELECT_LOCATION, props));
  };
}
