import {
  saveSurvey,
  _getSurveys,
  _getSurveyById,
  saveSurveyResult,
  _getSurveyResults,
  _deleteSurveyAndResults
} from '../../api/index.js';
import {
  SAVE_SURVEY_SECCESS,
  SAVE_SURVEY_ERROR,
  GET_SURVEYS_ERROR,
  GET_SURVEYS_SECCESS,
  SET_CURRENT_SURVEY,
  SET_PASSING_SURVEY,
  SAVE_SURVEY_RESULT_SECCESS,
  SAVE_SURVEY_RESULT_ERROR,
  GET_SURVEY_RESULT_SECCESS,
  GET_SURVEY_RESULT_ERROR,
  CLEAR_SURVEY,
  CLEAR_SURVEY_RESULT
} from '../survey/types';
import { history } from '../../index.jsx';

export const saveSurveyAsync = survey => dispatch => {
  saveSurvey(survey)
    .then(() => {
      dispatch({
        type: SAVE_SURVEY_SECCESS
      });
    })
    .catch(() =>
      dispatch({
        type: SAVE_SURVEY_ERROR,
        payload: res.data.message
      })
    );
};

export const setCurrentSurvey = (id, url) => dispatch => {
  _getSurveyById(id)
    .then(res => {
      dispatch({
        type: SET_CURRENT_SURVEY,
        payload: res.data.survey[0]
      });
      history.push(`/surveys/${url}`);
    })
    .catch(er => console.log(er));
};

export const getSurveyById = id => dispatch => {
  _getSurveyById(id)
    .then(res => {
      dispatch({
        type: SET_CURRENT_SURVEY,
        payload: res.data.survey[0]
      });
    })
    .catch(er => console.log(er));
};

export const setPassingSurvey = id => dispatch => {
  _getSurveyById(id)
    .then(res => {
      dispatch({
        type: SET_PASSING_SURVEY,
        payload: res.data.survey[0]
      });
    })
    .catch(er => console.log(er));
};

export const saveSurveyResultAsync = result => dispatch => {
  saveSurveyResult(result)
    .then(() => {
      dispatch({
        type: SAVE_SURVEY_RESULT_SECCESS
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: SAVE_SURVEY_RESULT_ERROR,
        payload: error
      });
    });
};

export const getSurveyResults = surveyId => dispatch => {
  _getSurveyResults(surveyId)
    .then(res => {
      dispatch({
        type: GET_SURVEY_RESULT_SECCESS,
        payload: res.data.results
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: GET_SURVEY_RESULT_ERROR,
        payload: error
      });
    });
};

export const clearSurveyAndResult = id => dispatch => {
  dispatch({
    type: CLEAR_SURVEY_RESULT
  });
  dispatch({
    type: CLEAR_SURVEY
  });
  history.push(`/survey-result/${id}`);
};

export const deleteSurveyAndResults = id => dispatch => {
  return _deleteSurveyAndResults(id);
};

export const getSurveys = (userId, limit, currentPage) => dispatch => {
  _getSurveys({ user: userId, limit: limit, currentPage: currentPage })
    .then(res => {
      dispatch({
        type: GET_SURVEYS_SECCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_SURVEYS_ERROR,
        payload: err
      });
    });
};
