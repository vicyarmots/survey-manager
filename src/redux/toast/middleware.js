import { ADD_TOAST, REMOVE_TOAST } from '../toast/types.js';

export const addToast = (text, type) => dispatch => {
  dispatch({
    type: ADD_TOAST,
    payload: {
      text: text,
      type: type
    }
  });
  setTimeout(() => {
    return dispatch({ type: REMOVE_TOAST });
  }, 3000);
};

export const removeToast = () => dispatch => dispatch({ type: REMOVE_TOAST });
