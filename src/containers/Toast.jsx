import { Toast } from 'components/Toast/index.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeToast } from '../redux/toast/middleware.js';

const mapStateToProps = store => {
  return {
    text: store.toastReducer.text,
    type: store.toastReducer.type
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ removeToast }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toast);
