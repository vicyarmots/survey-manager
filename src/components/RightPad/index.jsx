import React from 'react';
import './index.css';

class RightPad extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = ({ target }) => {
    this.props.setTypeAsk({ target });
    this.props.showModal();
  };

  render() {
    const fields = {
      oneAsk: {
        label: 'Answer (one)',
        icon: 'fas fa-dice-one'
      },
      severalAsk: {
        label: 'Answer (several)',
        icon: 'fas fa-dice-four'
      },
      text: {
        label: 'Text',
        icon: 'fas fa-font'
      },
      starRatings: {
        label: 'Star ratings',
        icon: 'fas fa-star'
      },
      scale: {
        label: 'Scale',
        icon: 'fas fa-stream'
      }
    };

    return (
      <nav className="right-pad panel box has-text-weight-semibold">
        <p className="panel-heading">Question Type</p>
        {Object.keys(fields).map(key => (
          <a
            className="panel-block button"
            key={key}
            name={key}
            onClick={this.handleClick}
          >
            <span className="panel-icon">
              <i className={fields[key].icon} aria-hidden="true" />
            </span>
            {fields[key].label}
          </a>
        ))}
      </nav>
    );
  }
}

export default RightPad;
