import React from 'react';
import { Link } from 'react-router-dom';
import LeftPad from '../LeftPad/index.jsx';
import './index.css';

class SurveyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns">
        <div class="column is-2">
          <LeftPad />
        </div>
        <div class="column is-8 temp" />
        <div class="column is-2 temp" />
      </div>
    );
  }
}

export default SurveyPage;
