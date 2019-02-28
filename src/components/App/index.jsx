import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/configureStore.js';
import Header from 'components/Header/index.jsx';
import Footer from 'components/Footer/index.jsx';
import Main from 'components/Main/index.jsx';

import './index.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="">
        <Header />
        <Main />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
