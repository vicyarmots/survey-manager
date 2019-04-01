import React from 'react';
import './index.css';

class SettingPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = {
      anonQuest: {
        label: 'Anonymous question'
      },
      questNumb: {
        label: 'Question numbers'
      },
      pageNumb: {
        label: 'Page numbers'
      },
      randomQuests: {
        label: 'Randomize questions'
      },
      asterisksFields: {
        label: 'Asterisks for mandatory fields'
      },
      progressBar: {
        label: 'Progress bar'
      }
    };

    return (
      <nav className="right-pad panel box has-text-weight-semibold">
        <p className="panel-heading">Survey options</p>
        {Object.keys(fields).map(key => (
          <a className="panel-block button" key={key} name={key}>
            <label className="checkbox ">
              <input
                name={key}
                type="checkbox"
                onChange={this.props.triggerCheckField}
              />
              {fields[key].label}
            </label>
          </a>
        ))}
      </nav>
    );
  }
}

export default SettingPad;
