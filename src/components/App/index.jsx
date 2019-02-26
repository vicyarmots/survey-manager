import React from 'react';
import { Provider } from 'react-redux';
import store from 'configureStore';
import Header from 'header';
import Footer from 'footer';
import Main from 'main';

import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Main />
      <Footer />
    </Provider>
  );
};

export default App;
