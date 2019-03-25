import { saveSurvey } from '../../api/index.js';
import { SAVE_SERVER_ERROR, SAVE_SERVER_SECCESS } from '../survey/types';

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
