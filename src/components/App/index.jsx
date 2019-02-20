import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from '../Header/index.jsx';
import Footer from '../Footer/index.jsx';
import Main from '../Main/index.jsx';

import './index.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Main/>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
