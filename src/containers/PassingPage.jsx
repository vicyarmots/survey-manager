import PassingPage from '../components/PassingPage/index.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  setPassingSurvey,
  saveSurveyResultAsync
} from '../redux/survey/middleware.js';

const mapStateToProps = store => {
  return {
    survey: store.surveyReducer.passingSurvey,
    userData: store.userReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setPassingSurvey, saveSurveyResultAsync },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PassingPage)
);
