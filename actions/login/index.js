import Keychain from 'react-native-keychain';
import * as navigationActions from '../navigation';
import * as appInitActions from '../app-init';
import * as routes from '../../routes';
import Tabbar from '../../shared/components/tabbar';
import * as api from '../../api';
import * as tabbarActions from '../tabbar';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const SET_USER = 'SET_USER';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

const { MAIN } = navigationActions;
const tabbarView = { title: '', view: Tabbar };

export function getToken() {
  return dispatch => Keychain.getGenericPassword()
    .then(creds => dispatch(loginWithToken(creds.password)))
    .catch(() => {
      console.log('ERROR GETTING TOKEN FROM KEYCHAIN');
      dispatch(logout());
    });
}

export function setToken(token) {
  return dispatch => Keychain.setGenericPassword('token', token)
    .then(() => {
      dispatch({ type: UPDATE_TOKEN, token });
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log('ERROR WITH KEYCHAIN: ', error);
      /* eslint-enable no-console */
    });
}

export function logout(resetNavStack) {
  function done(dispatch) {
    Keychain.resetGenericPassword();
    dispatch({ type: LOGGED_OUT });
    dispatch(appInitActions.initSuccess());
    if (resetNavStack) {
      dispatch(navigationActions.reset(MAIN, routes.SIGNUP));
    }
  }

  return dispatch => {
    Keychain.getGenericPassword()
      .then(creds => {
        api.logout(creds.password);
        done(dispatch);
      })
      .catch(() => {
        done(dispatch);
        console.log('ERROR GETTING TOKEN FROM KEYCHAIN WHILE LOGGING OUT');
      });
  };
}

export function loginWithToken(token) {
  return dispatch => {
    api.loginWithToken(token)
      .then(response => {
        if (response.error) {
          dispatch(logout());
        }

        if (response.user) {
          const { user } = response;
          dispatch({ type: SET_USER, user });
          dispatch({ type: LOGGED_IN });
          dispatch(appInitActions.initSuccess());
          dispatch(navigationActions.reset(MAIN, tabbarView));
          dispatch(tabbarActions.selectTab(0));
        }
      })
      .catch(() => {
        dispatch(logout());
      });
  };
}

export function loginWithCredentials(user, token) {
  return dispatch => {
    dispatch(setToken(token)).then(() => {
      dispatch({ type: SET_USER, user });
      dispatch({ type: LOGGED_IN });
      console.log('YOOOO');
      console.log(routes);
      dispatch(navigationActions.reset(MAIN, tabbarView));
      dispatch(tabbarActions.selectTab(0));
    });
  };
}
