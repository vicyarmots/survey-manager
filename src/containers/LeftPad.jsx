import LeftPad from '../components/LeftPad/index.jsx';
import { getSurveys } from '../redux/survey/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    userId: store.userReducer.userData.id,
    userRole: store.userReducer.userData.role
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getSurveys: getSurveys }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPad);
