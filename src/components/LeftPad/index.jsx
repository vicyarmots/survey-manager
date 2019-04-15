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
          <Link className="panel-block" to="/surveys">
            My surveys
          </Link>
          <a className="panel-block">Survey templates</a>
        </nav>
      </div>
    );
  }
}

export default LeftPad;
