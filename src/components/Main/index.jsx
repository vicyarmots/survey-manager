import React, { Component } from 'react';

import SiteRouter from '../Router/index.jsx';

import './index.css';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main>
        <SiteRouter/>
      </main>
    );
  }
}

export default Main;
