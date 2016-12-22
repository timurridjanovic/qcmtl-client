import { LOADING } from '../../actions/loading';

export const initialState = false;

function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return action.loading;
    default:
      return state;
  }
}

export default loadingReducer;
