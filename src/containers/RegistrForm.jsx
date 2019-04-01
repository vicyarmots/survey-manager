import RegistrForm from '../components/RegistrForm/index.jsx';
import { signUpUserAsync } from '../redux/user/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    isLoggedIn: store.userReducer.isLoggedIn,
    error: store.userReducer.errors
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signUpUserAsync: signUpUserAsync }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrForm);
