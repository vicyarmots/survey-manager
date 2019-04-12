import * as types from './types';

export const initialState = {
  type: null,
  text: null
};

export function toastReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TOAST:
      return {
        ...state,
        type: action.payload.type,
        text: action.payload.text
      };
    case types.REMOVE_TOAST:
      return {
        ...state,
        type: null,
        text: null
      };
    default:
      return state;
  }
}
