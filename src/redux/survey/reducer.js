import {
  SAVE_SURVEY_SECCESS,
  SAVE_SURVEY_ERROR,
  GET_SURVEYS_SECCESS,
  GET_SURVEYS_ERROR,
  SET_CURRENT_SURVEY,
  SET_PASSING_SURVEY,
  SAVE_SURVEY_RESULT_SECCESS,
  SAVE_SURVEY_RESULT_ERROR
} from './types';

export const initialState = {
  isSaved: false,
  error: null,
  surveys: [],
  currentSurvey: null,
  passingSurvey: null,
  pages: null,
  page: null,
  surveyResultIsSaved: null
};

export function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SURVEY_SECCESS:
      return {
        ...state,
        isSaved: true,
        error: null
      };
    case SAVE_SURVEY_ERROR:
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
    case SET_CURRENT_SURVEY:
      return {
        ...state,
        currentSurvey: action.payload
      };
    case SET_PASSING_SURVEY:
      return {
        ...state,
        passingSurvey: action.payload
      };
    case SAVE_SURVEY_RESULT_SECCESS:
      return {
        ...state,
        surveyResultIsSaved: true,
        error: null
      };
    case SAVE_SURVEY_RESULT_ERROR:
      return {
        ...state,
        surveyResultIsSaved: false,
        error: action.payload
      };
    default:
      return state;
  }
}
