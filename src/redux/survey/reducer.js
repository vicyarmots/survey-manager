import * as types from './types';

export const initialState = {
  isSaved: false,
  error: null,
  surveys: [],
  currentSurvey: null,
  currentSurveyResults: [],
  passingSurvey: null,
  pages: null,
  page: null,
  surveyResultIsSaved: null,
  surveyAndResultIsDelete: null
};

export function surveyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_SURVEY_SECCESS:
      return {
        ...state,
        isSaved: true,
        error: null
      };
    case types.SAVE_SURVEY_ERROR:
      return {
        ...state,
        isSaved: false,
        error: action.payload
      };
    case types.GET_SURVEYS_SECCESS:
      return {
        ...state,
        surveys: action.payload.surveys,
        pages: action.payload.countPages,
        page: action.payload.page
      };
    case types.GET_SURVEYS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.SET_CURRENT_SURVEY:
      return {
        ...state,
        currentSurvey: action.payload
      };
    case types.SET_PASSING_SURVEY:
      return {
        ...state,
        passingSurvey: action.payload
      };
    case types.SAVE_SURVEY_RESULT_SECCESS:
      return {
        ...state,
        surveyResultIsSaved: true,
        error: null
      };
    case types.SAVE_SURVEY_RESULT_ERROR:
      return {
        ...state,
        surveyResultIsSaved: false,
        error: action.payload
      };
    case types.GET_SURVEY_RESULT_SECCESS:
      return {
        ...state,
        currentSurveyResults: action.payload,
        error: null
      };
    case types.GET_SURVEY_RESULT_ERROR:
      return {
        ...state,
        currentSurveyResults: null,
        error: action.payload
      };
    case types.CLEAR_SURVEY:
      return {
        ...state,
        currentSurvey: null
      };
    case types.CLEAR_SURVEY_RESULT:
      return {
        ...state,
        currentSurveyResults: []
      };
    default:
      return state;
  }
}
