import { SET_DIMENSIONS } from '../../actions/dimensions';

function dimensionsReducer(state = {}, action) {
  switch (action.type) {
    case SET_DIMENSIONS:
      return { ...state, width: action.width, height: action.height };
    default:
      return state;
  }
}

export default dimensionsReducer;
