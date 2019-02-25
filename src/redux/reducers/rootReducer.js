export const initialState = {
    userIsLogin: false
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return action.userIsLogin;

    default:
      return state;
  }
}
