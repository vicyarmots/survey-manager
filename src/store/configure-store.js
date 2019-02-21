import { createStore } from 'redux';
import { rootReducer, initialState } from '../reducers/index.js';

const store = createStore(rootReducer, initialState);

export default store;