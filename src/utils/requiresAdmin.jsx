import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const checkAdmin = ComposedComponent => {
  class AuthenticateAdmmin extends React.Component {
    _checkAndRedirect = () => {
      const { userData, history } = this.props;
      if (userData.role !== 'admin') {
        console.log('ты не админ');
        history.push('/home');
      }
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    render() {
      return (
        <React.Fragment>
          {this.props.userData.role === 'admin' ? (
            <ComposedComponent {...this.props} />
          ) : null}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      userData: state.userReducer.userData
    };
  };

  return withRouter(
    connect(
      mapStateToProps,
      null
    )(AuthenticateAdmmin)
  );
};
