import RegistrForm from '../components/RegistrForm/index.jsx';
import { signUpUserAsync } from '../redux/user/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToast } from '../redux/toast/middleware.js';

const mapStateToProps = store => {
  return {
    isLoggedIn: store.userReducer.isLoggedIn,
    error: store.userReducer.errors,
    toastText: store.toastReducer.text
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { signUpUserAsync: signUpUserAsync, addToast },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrForm);
