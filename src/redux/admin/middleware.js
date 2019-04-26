import {
  _getUsersData,
  _changeUserName,
  _changeUserEmail,
  _deleteUser,
  _changeUserRole
} from '../../api/index.js';
import {
  GET_USERS_DATA_SUCCESS,
  GET_USERS_DATA_ERROR,
  CHANGE_USER_EMAIL_SUCCESS,
  CHANGE_USER_EMAIL_ERROR,
  CHANGE_USER_NAME_SUCCESS,
  CHANGE_USER_NAME_ERROR,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_ERROR,
  CHANGE_CURRENT_USER_ID
} from '../admin/types.js';

export const getUsersData = (limit, currentPage, sort) => dispatch => {
  _getUsersData(limit, currentPage, sort)
    .then(res => {
      dispatch({
        type: GET_USERS_DATA_SUCCESS,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_USERS_DATA_ERROR,
        payload: error
      });
      console.log(error);
    });
};

export const changeUserName = (id, newName, page) => dispatch => {
  _changeUserName(id, newName)
    .then(() => {
      dispatch({
        type: CHANGE_USER_NAME_SUCCESS
      });
    })
    .then(() => {
      _getUsersData(5, page).then(res => {
        dispatch({
          type: GET_USERS_DATA_SUCCESS,
          payload: res.data
        });
      });
    })
    .catch(error => {
      dispatch({
        type: CHANGE_USER_NAME_ERROR,
        payload: error
      });
      console.log(error);
    });
};

export const changeUserEmail = (id, newEmail, page) => dispatch => {
  _changeUserEmail(id, newEmail)
    .then(() => {
      dispatch({
        type: CHANGE_USER_EMAIL_SUCCESS
      });
    })
    .then(() => {
      _getUsersData(5, page).then(res => {
        dispatch({
          type: GET_USERS_DATA_SUCCESS,
          payload: res.data
        });
      });
    })
    .catch(error => {
      dispatch({
        type: CHANGE_USER_EMAIL_ERROR,
        payload: error
      });
      console.log(error);
    });
};

export const deleteUser = (id, page) => dispatch => {
  _deleteUser(id)
    .then(() => {
      dispatch({
        type: DELETE_USER_SUCCESS
      });
    })
    .then(() => {
      _getUsersData(5, page).then(res => {
        dispatch({
          type: GET_USERS_DATA_SUCCESS,
          payload: res.data
        });
      });
    })
    .catch(error => {
      dispatch({
        type: DELETE_USER_ERROR,
        payload: error
      });
      console.log(error);
    });
};

export const changeUserRole = (newRole, userId, page) => dispatch => {
  _changeUserRole(newRole, userId, page)
    .then(() => {
      dispatch({
        type: CHANGE_USER_ROLE_SUCCESS
      });
    })
    .then(() => {
      _getUsersData(5, page).then(res => {
        dispatch({
          type: GET_USERS_DATA_SUCCESS,
          payload: res.data
        });
      });
    })
    .catch(error => {
      dispatch({
        type: CHANGE_USER_ROLE_ERROR,
        payload: error
      });
      console.log(error);
    });
};

export const setUserId = userId => dispatch => {
  dispatch({
    type: CHANGE_CURRENT_USER_ID,
    payload: userId
  });
};
