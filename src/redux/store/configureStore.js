import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../rootReducer.js';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

export default store;
