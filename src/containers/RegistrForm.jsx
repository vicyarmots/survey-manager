import RegistrForm from '../components/RegistrForm/index.jsx';
import { setUser } from '../redux/actions/setUser.js';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    IsLogin: store.userIsLogin
  };
};

function setUserAsync(user) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setUser(user));
    }, 2000);
  };
}

const mapDispatchToProps = dispatch => ({
  changeUser: user => dispatch(setUserAsync(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrForm);
