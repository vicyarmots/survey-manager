import App from '../components/App/index.jsx';
import { connect } from 'react-redux';

const mapStateToProps = store => {
  return {
    isLoggedIn: store.isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
