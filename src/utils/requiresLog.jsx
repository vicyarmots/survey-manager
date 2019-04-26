import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LeftPad from '../containers/LeftPad.jsx';

export const checkAuth = ComposedComponent => {
  class Authenticate extends React.Component {
    _checkAndRedirect = () => {
      const { isLoggedIn, history } = this.props;
      if (!isLoggedIn) {
        history.push('/');
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
          {!!this.props.isLoggedIn ? (
            <div className="columns is-multiline main-wrap">
              <LeftPad />
              <ComposedComponent {...this.props} />
            </div>
          ) : null}
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.userReducer.isLoggedIn
    };
  };

  return withRouter(
    connect(
      mapStateToProps,
      null
    )(Authenticate)
  );
};
