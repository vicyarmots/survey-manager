import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class RightPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="right-pad panel box has-text-weight-semibold column is-2">
        <p className="panel-heading">Question Type</p>
        <a className="panel-block ">
          <span className="panel-icon ">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Answer options (one)
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Answer options (several)
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Text
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Star ratings
        </a>
        <a className="panel-block">
          <span className="panel-icon">
            <i className="fas fa-book" aria-hidden="true" />
          </span>
          Scale
        </a>
      </nav>
    );
  }
}

export default RightPad;
