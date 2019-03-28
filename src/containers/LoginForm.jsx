import LoginForm from '../components/LoginForm/index.jsx';
import { setUserAsync } from '../redux/user/middleware.js';
import { setUserUseToken } from '../redux/user/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    isLoggedIn: store.userReducer.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { setUser: setUserAsync, setUserUseToken: setUserUseToken },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
