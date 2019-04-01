import { saveSurvey, _getSurveys, getSurveyById } from '../../api/index.js';
import {
  SAVE_SERVER_ERROR,
  SAVE_SERVER_SECCESS,
  GET_SURVEYS_ERROR,
  GET_SURVEYS_SECCESS,
  SET_CURRENT_SURVEY,
  SET_PASSING_SURVEY
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
      dispatch({
        type: GET_SURVEYS_SECCESS,
        payload: res.data
      });
    })
    .then(() => history.push('/surveys'))
    .catch(err => {
      dispatch({
        type: GET_SURVEYS_ERROR,
        payload: err
      });
    });
};

export const setCurrentSurvey = (id, url) => dispatch => {
  getSurveyById(id)
    .then(res => {
      dispatch({
        type: SET_CURRENT_SURVEY,
        payload: res.data.survey[0]
      });
      history.push(`/surveys/${url}`);
    })
    .catch(er => console.log(er));
};

export const setPassingSurvey = id => dispatch => {
  getSurveyById(id)
    .then(res => {
      dispatch({
        type: SET_PASSING_SURVEY,
        payload: res.data.survey[0]
      });
    })
    .catch(er => console.log(er));
};
