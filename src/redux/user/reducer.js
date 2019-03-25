import {
  SIGN_IN_SUCCESS,
  SIGN_IN_UNSUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_UNSUCCESS
} from "./types";

export const initialState = {
  isLoggedIn: false,
  userData: null,
  errors: null
};

export function userReducer(state = initialState, action) {
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
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.userData,
        errors: null
      };
    case SIGN_UP_UNSUCCESS:
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
