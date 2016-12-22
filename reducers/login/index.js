import { UPDATE_TOKEN, SET_USER, LOGGED_IN, LOGGED_OUT } from '../../actions/login';

export const initialState = {};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TOKEN:
      return { ...state, token: action.token };
    case SET_USER:
      return { ...state, user: action.user };
    case LOGGED_IN:
      return { ...state, loggedIn: true };
    case LOGGED_OUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
}

export default loginReducer;
