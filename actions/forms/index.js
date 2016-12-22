import * as validationServices from '../../services/validation';
import * as toasterActions from '../toaster';
import * as api from '../../api';
import * as loginActions from '../login';

export const FORM_TERMS_AND_CONDITIONS_CHECK = 'FORM_TERMS_AND_CONDITIONS_CHECK';
export const FORM_UPDATE = 'FORM_UPDATE';
export const FORM_VALIDATE = 'FORM_VALIDATE';

export function termsAndConditionsCheck(page) {
  return dispatch => dispatch({ type: FORM_TERMS_AND_CONDITIONS_CHECK, page });
}

export function update(page, val, formType) {
  return dispatch => dispatch({ type: FORM_UPDATE, [formType]: val, formType, page });
}

export function validate(page, val, eventType, formType, form) {
  const validation = validationServices.validate(val, eventType, formType, form);
  return dispatch => {
    if (validation.error) {
      dispatch(toasterActions.showToaster({ text: validation.error, color: 'red' }));
    }
    return dispatch({ type: FORM_VALIDATE, validation, page, formType });
  };
}

export function submit(page, form) {
  return dispatch => {
    const validations = Object.keys(form).map((field) => {
      const validation = validationServices.validate(form[field], 'blur', field, form);
      return dispatch({ type: FORM_VALIDATE, validation, page, formType: field });
    });

    const errors = validations.filter(field => field.validation.error);

    if (errors.length > 0) {
      const field = errors[0];
      dispatch(toasterActions.showToaster({ text: field.validation.error, color: 'red' }));
      return false;
    }

    return true;
  };
}

export function submitToServer(page, form) {
  return dispatch => {
    api.signup(form).then(response => {
      if (response.error && response.errorTypes) {
        const { error, formType } = Object.keys(response.errorTypes).map(key => {
          return { error: response.errorTypes[key], formType: key };
        })[0];
        dispatch({ type: FORM_VALIDATE, validation: { state: 'error', error }, page, formType });
        dispatch(toasterActions.showToaster({ text: error, color: 'red' }));
      }
      if (response.token && response.user) {
        dispatch(loginActions.loginFromSignup(response.user, response.token));
      }
    });
  };
}
