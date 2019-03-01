import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftPad from '../components/LeftPad/index.jsx';
import RightPad from '../components/RightPad/index.jsx';

export const checkAuth = ComposedComponent => {
  class Authenticate extends React.Component {
    checkAndRedirect = () => {
      const { isLoggedIn, history } = this.props;

      if (!isLoggedIn) {
        history.push('/');
      }
    };

    render() {
      console.log(this.props);
      return (
        <div>
          {this.props.isLoggedIn ? (
            <div className="columns is-multiline main-wrap">
              <LeftPad />
              <ComposedComponent {...this.props} />
              <RightPad />
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
