import React, { Component } from 'react';
import Header from 'components/Header/index.jsx';
import Footer from 'components/Footer/index.jsx';
import Main from 'components/Main/index.jsx';
import './index.css';

export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <Header />
        <Main />
        <Footer />
      </React.Fragment>
    );
  }
}


