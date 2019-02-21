import React, { Component } from 'react';

import Header from '../Header/index.jsx';
import Footer from '../Footer/index.jsx';
import Main from '../Main/index.jsx';

import './index.css';

const App = props => {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
};

export default App;
