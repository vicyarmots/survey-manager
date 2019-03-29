import SurveyContainer from '../components/SurveyContainer/index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    survey: store.surveyReducer.currentSurvey
  };
};

export default connect(
  mapStateToProps,
  null
)(SurveyContainer);
