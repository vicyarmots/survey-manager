import {
  SAVE_SERVER_ERROR,
  SAVE_SERVER_SECCESS,
  GET_SURVEYS_SECCESS,
  GET_SURVEYS_ERROR,
  SET_CURRENT_SURVEY_ID
} from './types';

export const initialState = {
  isSaved: false,
  error: null,
  surveys: [],
  currentSurveyId: null,
  pages: null,
  page: null
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
        surveys: action.payload.surveys,
        pages: action.payload.countPages,
        page: action.payload.page
      };
    case GET_SURVEYS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT_SURVEY_ID:
      return {
        ...state,
        currentSurveyId: action.payload
      };
    default:
      return state;
  }
}
