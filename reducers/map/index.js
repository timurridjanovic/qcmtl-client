import { SET_LOCATIONS } from '../../actions/map';

function mapReducer(state = {}, action) {
  switch (action.type) {
    case SET_LOCATIONS:
      return { ...state, pickUp: action.pickUp, dropOff: action.dropOff };
    default:
      return state;
  }
}

export default mapReducer;
