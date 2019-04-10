import Header from 'components/Header/index.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../redux/user/middleware.js';

const mapStateToProps = store => {
  return {
    userData: store.userReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signOut }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
