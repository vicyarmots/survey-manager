import axios from 'axios';
import { API_URL } from '../../config.js';
import { getToken } from '../helpers/tokenHelpers.js';

export const signIn = ({ email, password }) => {
  return axios.post(`${API_URL}/sign-in`, { email, password });
};

export const signUp = ({ username, email, password }) => {
  const userRole = '5cb87249e738b3200ce585f8';
  return axios.post(`${API_URL}/sign-up`, {
    username,
    email,
    password,
    role: userRole
  });
};

export const saveSurvey = ({ user, surveyName, pages, setting, url }) => {
  return axios.post(
    `${API_URL}/save-survey`,
    {
      user,
      surveyName,
      pages,
      setting,
      url
    },
    {
      headers: {
        token: getToken()
      }
    }
  );
};

export const _getSurveys = ({ user, currentPage, limit }) => {
  return axios.get(`${API_URL}/get-surveys`, {
    params: {
      user,
      currentPage,
      limit
    },
    headers: {
      token: getToken()
    }
  });
};

export const _getSurveyById = id => {
  return axios.get(`${API_URL}/get-survey-by-id`, {
    params: {
      id: id
    },
    headers: {
      token: getToken()
    }
  });
};

export const saveSurveyResult = result => {
  return axios.post(`${API_URL}/save-survey-result`, result);
};

export const _getSurveyResults = id => {
  return axios.get(`${API_URL}/get-survey-results`, {
    params: {
      surveyId: id
    },
    headers: {
      token: getToken()
    }
  });
};

export const _deleteSurveyAndResults = id => {
  return axios.delete(`${API_URL}/delete-survey`, {
    params: {
      id: id
    },
    headers: {
      token: getToken()
    }
  });
};

export const _getUsersData = (limit, currentPage) => {
  return axios.get(`${API_URL}/get-users-data`, {
    params: {
      limit,
      currentPage
    },
    headers: {
      token: getToken()
    }
  });
};

export const _changeUserName = (id, newName) => {
  return axios.post(
    `${API_URL}/change-user-name`,
    {
      id,
      newName
    },
    {
      headers: {
        token: getToken()
      }
    }
  );
};

export const _changeUserEmail = (id, newEmail) => {
  return axios.post(
    `${API_URL}/change-user-email`,
    {
      id,
      newEmail
    },
    {
      headers: {
        token: getToken()
      }
    }
  );
};

export const _deleteUser = id => {
  return axios.post(
    `${API_URL}/delete-user`,
    {
      id
    },
    {
      headers: {
        token: getToken()
      }
    }
  );
};
