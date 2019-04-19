import { combineReducers } from 'redux';
import { surveyReducer } from './survey/reducer.js';
import { userReducer } from './user/reducer.js';
import { toastReducer } from './toast/reducer.js';
import { adminReducer } from './admin/reducer.js';

const rootReducer = combineReducers({
  surveyReducer,
  userReducer,
  toastReducer,
  adminReducer
});

export default rootReducer;
