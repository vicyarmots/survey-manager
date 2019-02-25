import LoginForm from '../components/Login-form/index.jsx';
import { setUser } from '../redux/actions/setUser.js';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => ({
  changeUser: user => dispatch(setUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
