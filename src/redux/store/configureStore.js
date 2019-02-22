import { createStore } from 'redux';
import { rootReducer, initialState } from '../reducers/rootReducer.js';
import setUser from '../actions/setUser';

const store = createStore(rootReducer, initialState);

store.subscribe(() => {
  console.log('subscribe', store.getState());
});

export default store;
