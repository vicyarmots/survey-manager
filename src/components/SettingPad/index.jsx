import React from "react";
import "./index.css";

class SettingPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fields = {
      anonQuest: {
        label: "anonymous question"
      },
      questNumb: {
        label: "question numbers"
      },
      pageNumb: {
        label: "page numbers"
      },
      randomQuests: {
        label: "randomize questions"
      },
      asterisksFields: {
        label: "asterisks for mandatory fields"
      }
    };

    return (
      <nav className="right-pad panel box has-text-weight-semibold">
        <p className="panel-heading">Survey options</p>
        {Object.keys(fields).map(key => (
          <a className="panel-block button" key={key} name={key}>
            <label className="checkbox">
            <input type="checkbox"/>
            {fields[key].label}
            </label>
          </a>
        ))}
      </nav>
    );
  }
}

export default SettingPad;
