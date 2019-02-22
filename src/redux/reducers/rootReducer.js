export const initialState = {
  user: { name: 'Unknown User' }
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
