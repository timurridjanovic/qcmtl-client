export const TAB_SELECTED = 'TAB_SELECTED';

export function selectTab(tab) {
  return dispatch => dispatch({ type: TAB_SELECTED, tab });
}
