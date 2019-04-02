import axios from 'axios';
import { API_URL } from '../../config.js';

export const signIn = ({ email, password }) => {
  return axios.post(`${API_URL}/sign-in`, { email, password });
};

export const signUp = ({ username, email, password }) => {
  return axios.post(`${API_URL}/sign-up`, {
    username,
    email,
    password
  });
};

export const saveSurvey = ({ user, surveyName, pages, setting, url }) => {
  return axios.post(`${API_URL}/save-survey`, {
    user,
    surveyName,
    pages,
    setting,
    url
  });
};

export const _getSurveys = ({ user, currentPage, limit }) => {
  return axios.get(`${API_URL}/get-surveys`, {
    params: {
      user,
      currentPage,
      limit
    }
  });
};

export const getSurveyById = id => {
  return axios.get(`${API_URL}/get-survey-by-id`, {
    params: {
      id: id
    }
  });
};

export const saveSurveyResult = result => {
  return axios.post(`${API_URL}/save-survey-result`, result);
};
