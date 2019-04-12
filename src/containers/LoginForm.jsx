import LoginForm from '../components/LoginForm/index.jsx';
import { setUserAsync } from '../redux/user/middleware.js';
import { setUserUseToken } from '../redux/user/middleware.js';
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
    { setUser: setUserAsync, setUserUseToken, addToast },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
