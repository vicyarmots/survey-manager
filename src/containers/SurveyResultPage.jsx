import SurveyResultPage from 'components/SurveyResultPage/index.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSurveyResults, getSurveyById } from '../redux/survey/middleware.js';

const mapStateToProps = store => {
  return {
    results: store.surveyReducer.currentSurveyResults,
    survey: store.surveyReducer.currentSurvey
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getSurveyResults, getSurveyById }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SurveyResultPage)
);
