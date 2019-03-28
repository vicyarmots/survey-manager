import Surveys from '../components/Surveys/index.jsx';
import { connect } from 'react-redux';
import { setCurrentSurveyId, getSurveys } from '../redux/survey/middleware.js';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    surveys: store.surveyReducer.surveys,
    countPages: store.surveyReducer.pages,
    userId: store.userReducer.userData.id,
    page: store.surveyReducer.page
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setCurrentSurveyId: setCurrentSurveyId, getSurveys: getSurveys },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Surveys);
