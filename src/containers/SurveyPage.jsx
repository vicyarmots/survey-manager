import SurveyPage from '../components/SurveyPage/index.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSurveyAsync } from '../redux/survey/middleware.js';

const mapStateToProps = store => {
  return {
    userData: store.userReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ saveSurveyAsync: saveSurveyAsync }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyPage);
