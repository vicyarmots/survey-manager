import UsersPage from 'components/UsersPage/index.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser,
  changeUserRole,
  setUserId
} from '../redux/admin/middleware.js';
import { signOut } from '../redux/user/middleware.js';
import { addToast } from '../redux/toast/middleware.js';

const mapStateToProps = store => {
  return {
    usersData: store.adminReducer.usersData,
    currentUserId: store.userReducer.userData.id
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getUsersData,
      addToast,
      changeUserName,
      changeUserEmail,
      deleteUser,
      changeUserRole,
      setUserId,
      signOut
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
