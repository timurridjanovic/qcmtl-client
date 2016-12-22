import { Animated } from 'react-native';

export const SHOW_TOASTER = 'SHOW_TOASTER';
export const HIDE_TOASTER = 'HIDE_TOASTER';
export const toasterYCoord = new Animated.Value(-70);

const hideToast = (dispatch) => {
  setTimeout(() => {
    Animated.timing(
      toasterYCoord,
      {
        toValue: -70,
        duration: 350
      }
    ).start();
    dispatch({ type: HIDE_TOASTER });
  }, 2000);
};

const showToast = (dispatch) => {
  Animated.timing(
    toasterYCoord,
    {
      toValue: 0,
      duration: 750
    }
  ).start(dispatch(hideToaster()));
};

export function showToaster({ text, color }) {
  return dispatch => {
    dispatch({ type: SHOW_TOASTER, text, color });
    showToast(dispatch);
  };
}

export function hideToaster() {
  return dispatch => hideToast(dispatch);
}
