import * as types from './types';

export const initialState = {
  isLoggedIn: false,
  userData: null,
  errors: null,
  userImageUpload: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.userData
      };
    case types.SIGN_IN_UNSUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        errors: action.payload
      };
    case types.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.userData,
        errors: null
      };
    case types.SIGN_UP_UNSUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        errors: action.payload
      };
    case types.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        errors: null
      };
    case types.UPLOAD_USER_IMAGE_OK:
      return {
        ...state,
        userData: { ...state.userData, profileImage: action.payload }
      };
    default:
      return state;
  }
}
