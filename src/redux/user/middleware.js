import {setUser} from './action';

export function setUserAsync(user) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setUser(user));
    }, 0);
  };
}