import { TAB_SELECTED } from '../../actions/tabbar';

const initialState = { currentTab: 0 };

function tabbarReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_SELECTED:
      return { ...state, currentTab: action.tab };
    default:
      return state;
  }
}

export default tabbarReducer;
