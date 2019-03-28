import { saveSurvey, _getSurveys } from '../../api/index.js';
import {
  SAVE_SERVER_ERROR,
  SAVE_SERVER_SECCESS,
  GET_SURVEYS_ERROR,
  GET_SURVEYS_SECCESS,
  SET_CURRENT_SURVEY_ID
} from '../survey/types';
import { history } from '../../index.jsx';

export const saveSurveyAsync = survey => dispatch => {
  saveSurvey(survey)
    .then(res => {
      dispatch({
        type: SAVE_SERVER_SECCESS
      });
    })
    .catch(err =>
      dispatch({
        type: SAVE_SERVER_ERROR,
        payload: res.data.message
      })
    );
};

export const getSurveys = (userId, limit, currentPage) => dispatch => {
  _getSurveys({ user: userId, limit: limit, currentPage: currentPage })
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_SURVEYS_SECCESS,
        payload: res.data
      });
      history.push('/surveys');
    })
    .catch(err => {
      dispatch({
        type: GET_SURVEYS_ERROR,
        payload: err
      });
    });
};

export const setCurrentSurveyId = id => dispatch => {
  dispatch({
    type: SET_CURRENT_SURVEY_ID,
    payload: id
  });
};
