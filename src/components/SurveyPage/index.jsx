import React from 'react';
import { Link } from 'react-router-dom';
import LeftPad from '../LeftPad/index.jsx';
import RightPad from '../RightPad/index.jsx';
import './index.css';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-2">
          <LeftPad />
        </div>
        <div className="column is-8">
          <div className="columns is-multiline">
            <div className="column is-full">
              <div className="box field survey-main">
                <label className="label">New Survey</label>
                <div className="control">
                  <input className="input is-small" type="text" />
                </div>
              </div>
            </div>
            <div className="column is-full ">
              <p className="is-pulled-left margin-10">Questions: 0, Pages: 0</p>
              <div className="is-pulled-right ">
                <button className="button margin-10">Save</button>
                <button className="button margin-10">New page</button>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-2">
          <RightPad />
        </div>
      </div>
    );
  }
}

export default SurveyPage;
