import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LeftPad extends React.Component {
  constructor(props) {
    super(props);
  }
  _getSurveys = () => {
    this.props.getSurveys(this.props.userId);
  };

  render() {
    return (
      <div className="column is-2">
        <nav className="left-pad panel box has-text-weight-semibold">
          <Link className="panel-block" to="/survey-page">
            New survey
          </Link>

          <a
            className="panel-block"
            onClick={this._getSurveys}
            className="panel-block"
          >
            My surveys
          </a>

          <a className="panel-block">Survey templates</a>
        </nav>
      </div>
    );
  }
}

export default LeftPad;
