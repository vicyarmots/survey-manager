import React, { Component } from 'react';
import Header from 'containers/Header.jsx';
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
