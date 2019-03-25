import { SAVE_SERVER_ERROR, SAVE_SERVER_SECCESS } from './types';

export const initialState = {
  isSaved: false,
  error: null
};

export function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SERVER_SECCESS:
      return {
        ...state,
        isSaved: true,
        error: null
      };
    case SAVE_SERVER_ERROR:
      return {
        ...state,
        isSaved: false,
        error: action.payload
      };
    default:
      return state;
  }
}
