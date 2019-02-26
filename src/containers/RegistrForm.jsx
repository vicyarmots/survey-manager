import RegistrForm from '../components/RegistrForm/index.jsx';
import { setUserAsync } from '../redux/user/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = store => {
  return {
    isLoggedIn: store.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ changeUser: setUserAsync }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrForm);
