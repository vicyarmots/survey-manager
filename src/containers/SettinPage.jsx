import SettingPage from '../components/SettingPage/index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    userData: store.userReducer.userData
  };
};
export default connect(
  mapStateToProps,
  null
)(SettingPage);
