import * as loadingActions from '../loading';
import * as loginActions from '../login';

export const APP_INIT = 'APP_INIT';
export const APP_INIT_SUCCESS = 'APP_INIT_SUCCESS';

export function init() {
  return dispatch => {
    dispatch({ type: APP_INIT });
    dispatch(loadingActions.setLoading(true));
    dispatch(loginActions.getToken());
  };
}

export function initSuccess() {
  return dispatch => {
    dispatch({ type: APP_INIT_SUCCESS });
    dispatch(loadingActions.setLoading(false));
  };
}
