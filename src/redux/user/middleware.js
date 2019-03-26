import {
  setUser,
  setAuthError,
  signUpUserSuccess,
  signUpUserUnSuccess
} from './action';
import { history } from '../../index.jsx';
import { signIn, signUp } from '../../api/index.js';
import { setToken } from '../../helpers/tokenHelpers.js';

export const setUserAsync = user => dispatch => {
  signIn(user)
    .then(res => {
      dispatch(setUser(res.data));
      history.push('/home');
      return res.data.token;
    })
    .then(token => {
      setToken(token);
    })
    .catch(err => {
      dispatch(setAuthError(err.response.data.message));
    });
};

export const signUpUserAsync = user => dispatch => {
  signUp(user)
    .then(res => {
      dispatch(signUpUserSuccess(res.data));
      history.push('/home');
    })
    .catch(err => dispatch(signUpUserUnSuccess(err.response.data.message)));
};
