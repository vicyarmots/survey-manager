import { saveSurvey, _getSurveys } from '../../api/index.js';
import {
  SAVE_SERVER_ERROR,
  SAVE_SERVER_SECCESS,
  GET_SURVEYS_ERROR,
  GET_SURVEYS_SECCESS
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

export const getSurveys = userId => dispatch => {
  _getSurveys({ user: userId })
    .then(res => {
      dispatch({
        type: GET_SURVEYS_SECCESS,
        payload: res.data.surveys
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
