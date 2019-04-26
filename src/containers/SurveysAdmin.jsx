import Surveys from '../components/Surveys/index.jsx';
import { connect } from 'react-redux';
import {
  setCurrentSurvey,
  getSurveys,
  clearSurveyAndResult,
  deleteSurveyAndResults
} from '../redux/survey/middleware.js';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    surveys: store.surveyReducer.surveys,
    countPages: store.surveyReducer.pages,
    userId: store.adminReducer.currentUserId,
    page: store.surveyReducer.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentSurvey: setCurrentSurvey,
      getSurveys,
      clearSurveyAndResult,
      deleteSurveyAndResults
    },
    dispatch
  );
};

const SurveysAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Surveys);

export default SurveysAdmin;
