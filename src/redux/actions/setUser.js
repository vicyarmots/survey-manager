export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export function setUser(user) {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        {
          type: GET_USER_SUCCESS,
          payload: user
        },
        2000
      );
    });
  };
}
