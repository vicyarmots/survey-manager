import axios from 'axios';

export const signIn = ({ email, password }) => {
  return axios.post('http://localhost:3000/sign-in', { email, password });
};

export const signUp = ({ username, email, password }) => {
  return axios.post('http://localhost:3000/sign-up', {
    username,
    email,
    password
  });
};

export const saveSurvey = ({ user, surveyName, pages, setting, url }) => {
  return axios.post('http://localhost:3000/save-survey', {
    user,
    surveyName,
    pages,
    setting,
    url
  });
};

export const _getSurveys = ({ user, currentPage, limit }) => {
  return axios.get('http://localhost:3000/get-surveys', {
    params: {
      user,
      currentPage,
      limit
    }
  });
};

export const getSurveyById = id => {
  return axios.get('http://localhost:3000/get-survey-by-id', {
    params: {
      id: id
    }
  });
};
