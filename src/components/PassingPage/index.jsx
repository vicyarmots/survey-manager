import React, { Component } from 'react';

import './index.css';

export default class PassingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('passingPage', this.props);
    return <div>123</div>;
  }
}
