import { createStore, applyMiddleware } from 'redux';
import { rootReducer, initialState } from '../user/reducer.js';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

export default store;
