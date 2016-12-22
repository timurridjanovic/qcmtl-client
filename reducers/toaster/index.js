import { SHOW_TOASTER, HIDE_TOASTER } from '../../actions/toaster';

export const initialState = { show: false, color: 'red', text: '' };

export default function toasterReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TOASTER:
      return {
        ...state,
        show: true,
        text: action.text,
        color: action.color
      };
    case HIDE_TOASTER:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
