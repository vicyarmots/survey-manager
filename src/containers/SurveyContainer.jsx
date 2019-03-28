import SurveyContainer from '../components/SurveyContainer/index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    id: store.surveyReducer.currentSurveyId
  };
};

export default connect(
  mapStateToProps,
  null
)(SurveyContainer);
