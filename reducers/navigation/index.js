import { NAV_PUSH, NAV_SET, UNSET_NAVS, NAV_RESET, MAIN, OFFER_RIDE } from '../../actions/navigation';

export const initialState = {
  [MAIN]: { route: {} },
  [OFFER_RIDE]: { route: {} },
  rides: { route: {} },
  settings: { route: {} }
};

function navigationReducer(state = initialState, action) {
  switch (action.type) {
    case NAV_SET:
      return { ...state, [action.navType]: { ...state[action.navType], nav: action.nav } };
    case NAV_PUSH:
      return { ...state, [action.navType]: { ...state[action.navType], route: action.route } };
    case NAV_RESET:
      return { ...state, [action.navType]: { ...state[action.navType], route: action.route } };
    case UNSET_NAVS:
      return Object.keys(state).reduce((newState, navType) => {
        newState[navType] = { ...state[navType], nav: null };
        return newState;
      }, {});
    default:
      return state;
  }
}

export default navigationReducer;
