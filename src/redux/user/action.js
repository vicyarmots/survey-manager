export function setUser(bool) {
  return {
    type: 'SET_USER',
    isLoggedIn: bool
  };
}
