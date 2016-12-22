import * as toasterActions from '../toaster';
import * as api from '../../api';
import * as loginActions from '../login';

import { FORM_VALIDATE } from '../forms';
import { PAGE } from '../../pages/login';

export function submitToServer(form) {
  return dispatch => {
    api.login(form).then(response => {
      console.log('RESPONSE: ', response);
      if (response.error && response.errorTypes) {
        const { error, formType } = Object.keys(response.errorTypes).map(key => {
          return { error: response.errorTypes[key], formType: key };
        })[0];
        dispatch({ type: FORM_VALIDATE, validation: { state: 'error', error }, page: PAGE, formType });
        dispatch(toasterActions.showToaster({ text: error, color: 'red' }));
      }
      if (response.token && response.user) {
        dispatch(loginActions.loginWithCredentials(response.user, response.token));
      }
    });
  };
}
