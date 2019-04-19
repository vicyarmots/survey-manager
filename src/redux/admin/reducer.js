import * as types from './types.js';

export const initialState = {
  usersData: null,
  error: null
};

export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        usersData: action.payload,
        error: null
      };
    default:
      return state;
  }
}
