export function setUser({ firstName, email }) {
  return {
    type: "SIGN_IN_SUCCESS",
    userData: {
      firstName: firstName,
      email: email
    }
  };
}

export function setAuthError(error) {
  return {
    type: "SIGN_IN_UNSUCCESS",
    payload: error
  };
}
