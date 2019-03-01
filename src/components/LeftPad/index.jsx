import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LeftPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="column is-2">
        <nav className="left-pad panel box has-text-weight-semibold">
          <Link className="panel-block" to="/survey-page">
            New survey
          </Link>
          <a className="panel-block">My surveys</a>
          <a className="panel-block">Survey templates</a>
        </nav>
      </div>
    );
  }
}

export default LeftPad;
