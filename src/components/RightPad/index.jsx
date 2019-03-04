import React from "react";
import "./index.css";

class RightPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { showModal } = this.props;

    return (
      <nav className="right-pad panel box has-text-weight-semibold">
        <p className="panel-heading">Question Type</p>
        <a onClick={showModal} className="panel-block">
          <span className="panel-icon">
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
