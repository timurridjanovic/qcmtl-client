export const LOADING = 'LOADING';

export function setLoading(loading) {
  return dispatch => dispatch({ type: LOADING, loading });
}
