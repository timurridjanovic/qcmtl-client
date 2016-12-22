export const NAV_PUSH = 'NAV_PUSH';
export const NAV_SET = 'NAV_SET';
export const UNSET_NAVS = 'UNSET_NAVS';
export const NAV_RESET = 'NAV_RESET';
export const MAIN = 'main';
export const OFFER_RIDE = 'offerRide';

export function push(navType, route, props) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.navigation[navType].nav) {
      state.navigation[navType].nav.push({
        title: route.title,
        component: route.view,
        backButtonTitle: route.backButtonTitle,
        navigationBarHidden: !route.navBar,
        passProps: props
      });
      dispatch({ type: NAV_PUSH, route, navType });
    }
  };
}

export function reset(navType, route) {
  return (dispatch, getState) => {
    const state = getState();
    console.log('OOMPA');
    console.log(state.navigation[navType]);
    if (state.navigation[navType].nav) {
      console.log(route.title);
      state.navigation[navType].nav.resetTo({
        title: route.title,
        component: route.view,
        backButtonTitle: route.backButtonTitle,
        navigationBarHidden: !route.navBar
      });
      dispatch({ type: NAV_RESET, route, navType });
    }
  };
}

export function replace(navType, route) {
  return (dispatch, getState) => {
    const state = getState();
    console.log('OOMPA');
    console.log(state.navigation[navType]);
    if (state.navigation[navType].nav) {
      console.log(route.title);
      state.navigation[navType].nav.replace({
        title: route.title,
        component: route.view,
        backButtonTitle: route.backButtonTitle,
        navigationBarHidden: !route.navBar
      });
      dispatch({ type: NAV_RESET, route, navType });
    }
  };
}

export function setNavigator(navType, nav) {
  return dispatch => dispatch({ type: NAV_SET, nav, navType });
}

export function unsetNavigators() {
  return dispatch => dispatch({ type: UNSET_NAVS });
}
