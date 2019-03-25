export function setUser({ username, email, id }) {
  return {
    type: 'SIGN_IN_SUCCESS',
    userData: {
      username: username,
      email: email,
      id: id
    }
  };
}

export function setAuthError(error) {
  return {
    type: 'SIGN_IN_UNSUCCESS',
    payload: error
  };
}

export function signUpUserSuccess({ username, email }) {
  return {
    type: 'SIGN_UP_SUCCESS',
    userData: {
      username: username,
      email: email
    }
  };
}

export function signUpUserUnSuccess(error) {
  return {
    type: 'SIGN_UP_UNSUCCESS',
    payload: error
  };
}
