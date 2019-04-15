import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../rootReducer.js';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

export default store;
