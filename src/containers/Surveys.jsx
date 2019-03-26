import { Surveys } from '../components/Surveys/index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    surveys: store.surveyReducer.surveys
  };
};

export default connect(
  mapStateToProps,
  null
)(Surveys);
