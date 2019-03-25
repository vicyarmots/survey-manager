import { combineReducers } from 'redux';
import { surveyReducer } from './survey/reducer.js';
import { userReducer } from './user/reducer.js';

const rootReducer = combineReducers({
  surveyReducer,
  userReducer
});

export default rootReducer;
