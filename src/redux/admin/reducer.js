import * as types from './types.js';

export const initialState = {
  usersData: null,
  currentUserId: null,
  error: null,
  isChnaged: null,
  isDeleted: null
};

export function adminReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_USERS_DATA_SUCCESS:
      return {
        ...state,
        usersData: action.payload,
        error: null
      };
    case types.GET_USERS_DATA_ERROR:
      return {
        ...state,
        usersData: null,
        error: action.payload
      };
    case types.CHANGE_USER_NAME_SUCCESS:
      return {
        ...state,
        isChnaged: true,
        error: null
      };
    case types.CHANGE_USER_NAME_ERROR:
      return {
        ...state,
        isChnaged: false,
        error: action.payload
      };
    case types.CHANGE_USER_EMAIL_SUCCESS:
      return {
        ...state,
        isChnaged: true,
        error: null
      };
    case types.CHANGE_USER_EMAIL_ERROR:
      return {
        ...state,
        isChnaged: false,
        error: action.payload
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        error: null
      };
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        isDeleted: false,
        error: action.payload
      };
    case types.CHANGE_USER_ROLE_SUCCESS:
      return {
        ...state,
        isChnaged: true,
        error: null
      };
    case types.CHANGE_USER_ROLE_ERROR:
      return {
        ...state,
        isChnaged: false,
        error: action.payload
      };
    case types.CHANGE_CURRENT_USER_ID:
      return {
        ...state,
        currentUserId: action.payload
      };
    default:
      return state;
  }
}
