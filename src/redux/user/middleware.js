import {
  setUser,
  setAuthError,
  signUpUserSuccess,
  signUpUserUnSuccess
} from './action';

import { SIGN_OUT_SUCCESS } from './types.js';

import { history } from '../../index.jsx';
import { signIn, signUp } from '../../api/index.js';
import { setToken, getToken } from '../../helpers/tokenHelpers.js';
import jwt from 'jsonwebtoken';

export const setUserAsync = user => dispatch => {
  signIn(user)
    .then(res => {
      const userData = jwt.decode(res.data.token, { complete: true });
      console.log(userData);
      dispatch(setUser(userData.payload));
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
    })
    .catch(err => dispatch(signUpUserUnSuccess(err.response.data.message)));
};

export const setUserUseToken = () => dispatch => {
  const token = getToken();
  if (!!token) {
    const userData = jwt.decode(token, { complete: true });
    dispatch(setUser(userData.payload));
    history.push('/home');
  }
};

export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT_SUCCESS
  });
};
