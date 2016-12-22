import { RIDE_CREATION } from '../../actions/offer-ride';

function offerRideReducer(state = {}, action) {
  switch (action.type) {
    case RIDE_CREATION:
      return { ...state, ride: action.ride };
    default:
      return state;
  }
}

export default offerRideReducer;
