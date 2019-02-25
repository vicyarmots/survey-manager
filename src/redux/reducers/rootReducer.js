import { GET_USER_SUCCESS } from '../actions/setUser.js';

export const initialState = {
  user:{
    userIsLogin: false
  }
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
