import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LeftPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="left-pad panel box has-text-weight-semibold">
        <a class="panel-block">New survey</a>
        <a class="panel-block">My surveys</a>
        <a class="panel-block">Survey templates</a>
      </nav>
    );
  }
}

export default LeftPad;
