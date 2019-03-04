import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftPad from '../components/LeftPad/index.jsx';

export const checkAuth = ComposedComponent => {
  class Authenticate extends React.Component {
    checkAndRedirect = () => {
      const { isLoggedIn, history } = this.props;

      if (!!isLoggedIn) {
        history.push('/');
      }
    };

    render() {
      return (
        <div>
          {!this.props.isLoggedIn ? (
            <div className="columns is-multiline main-wrap">
              <LeftPad />
              <ComposedComponent {...this.props} />
            </div>
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.isLoggedIn
    };
  };

  return withRouter(
    connect(
      mapStateToProps,
      null
    )(Authenticate)
  );
};
