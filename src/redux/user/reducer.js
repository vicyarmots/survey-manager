import { SIGN_IN_SUCCESS } from "./types";
import { SIGN_IN_UNSUCCESS } from "./types";

export const initialState = {
  isLoggedIn: false,
  userData: null,
  errors: null
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.userData
      };
    case SIGN_IN_UNSUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        errors: action.payload
      };

    default:
      return state;
  }
}
