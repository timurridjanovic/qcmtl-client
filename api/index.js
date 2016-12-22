import config from '../config';
import * as loadingActions from '../actions/loading';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

let __dispatch = null;
function _dispatch(action) {
  if (__dispatch) {
    __dispatch(action);
  }
}

function stopLoading(response) {
  _dispatch(loadingActions.setLoading(false));
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

function fromJsonToForm(form) {
  console.log('FORM: ', form);
  const newForm = new FormData();
  return Object.keys(form).reduce((newForm, key) => {
    const newKey = key.replace(/([A-Z])/g, $1 => '_'.concat($1.toLowerCase()));
    console.log(newKey, key);
    newForm.append(newKey, form[key].toString());
    return newForm;
  }, newForm);
}

function fromFormToJson(form) {
  if (Object.prototype.toString.call(form) !== '[object Object]') {
    return form;
  }
  return Object.keys(form).reduce((json, key) => {
    const newKey = key.replace(/_(.)/g, g => g[1].toUpperCase());
    json[newKey] = fromFormToJson(form[key]);
    return json;
  }, {});
}

export function setDispatch(dispatch) {
  __dispatch = dispatch;
}

function request(url, req, method) {
  _dispatch(loadingActions.setLoading(true));
  return fetch(url, {
    method,
    headers: defaultHeaders,
    body: fromJsonToForm(req)
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(fromFormToJson)
  .then(stopLoading)
  .catch((error) => {
    _dispatch(loadingActions.setLoading(false));
    /* eslint-disable no-console */
    console.log('API ERROR: ', error);
    /* eslint-enable no-console */
  });
}

function fillInUserId(url, userId) {
  return url.replace('[user]', userId);
}

export function signup(form) {
  return request(config.api.users, form, 'POST');
}

export function createRideOffer(form, userId) {
  return request(fillInUserId(config.api.rideOffer, userId), form, 'POST');
}

export function loginWithToken(token) {
  return request(config.api.login, { token }, 'POST');
}

export function login(form) {
  return request(config.api.login, form, 'POST');
}

export function logout(token) {
  return request(config.api.logout, { token }, 'POST');
}
