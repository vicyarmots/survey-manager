import {
  SAVE_SERVER_ERROR,
  SAVE_SERVER_SECCESS,
  GET_SURVEYS_SECCESS,
  GET_SURVEYS_ERROR
} from './types';

export const initialState = {
  isSaved: false,
  error: null,
  surveys: []
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
    case GET_SURVEYS_SECCESS:
      return {
        ...state,
        surveys: action.payload
      };
    case GET_SURVEYS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
