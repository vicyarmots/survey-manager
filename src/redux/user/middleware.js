import {
  setUser,
  setAuthError,
  signUpUserSuccess,
  signUpUserUnSuccess
} from './action';

import { SIGN_OUT_SUCCESS, UPLOAD_USER_IMAGE_OK } from './types.js';

import { history } from '../../index.jsx';
import { signIn, signUp, _uploadUserImage } from '../../api/index.js';
import { setToken, getToken } from '../../helpers/tokenHelpers.js';
import jwt from 'jsonwebtoken';

export const uploadUserImage = formData => dispatch => {
  _uploadUserImage(formData)
    .then(res => {
      console.log(res);
      return res.data.url;
    })
    .then(newUrl => {
      console.log(newUrl);
      dispatch({
        type: UPLOAD_USER_IMAGE_OK,
        payload: newUrl
      });
      return newUrl;
    })
    .catch(err => {
      console.log(err);
    });
};

export const setUserAsync = user => dispatch => {
  signIn(user)
    .then(res => {
      const userData = jwt.decode(res.data.token, { complete: true });
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
