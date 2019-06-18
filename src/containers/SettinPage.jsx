import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SettingPage from '../components/SettingPage/index.jsx';
import { uploadUserImage } from '../redux/user/middleware.js';

const mapStateToProps = store => {
  return {
    userData: store.userReducer.userData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ uploadUserImage }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingPage);
