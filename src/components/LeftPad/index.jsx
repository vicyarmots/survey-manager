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
        <a className="panel-block">New survey</a>
        <a className="panel-block">My surveys</a>
        <a className="panel-block">Survey templates</a>
      </nav>
    );
  }
}

export default LeftPad;
