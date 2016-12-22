import { APP_INIT, APP_INIT_SUCCESS } from '../../actions/app-init';
const initialState = true;

function appInitReducer(state = initialState, action) {
  switch(action.type) {
    case APP_INIT:
      return true;
    case APP_INIT_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default appInitReducer;
