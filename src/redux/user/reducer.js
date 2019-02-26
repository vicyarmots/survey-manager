export const initialState = {
  isLoggedIn: false
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };

    default:
      return state;
  }
}
