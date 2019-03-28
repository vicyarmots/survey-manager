import App from '../components/App/index.jsx';
import { setUserUseToken } from '../redux/user/middleware.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setUserUseToken: setUserUseToken }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(App);
