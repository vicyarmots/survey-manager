import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LeftPad from "../components/LeftPad/index.jsx";

export const checkAuth = ComposedComponent => {
  class Authenticate extends React.Component {
    checkAndRedirect = () => {
      const { isLoggedIn, history } = this.props;

      console.log(isLoggedIn);
      if (!isLoggedIn) {
        history.push("/");
      }
    };

    render() {
      return (
        <div className="survey-wrap">
          {!!this.props.isLoggedIn ? (
            <div className="columns is-multiline main-wrap">
              <LeftPad />
              <ComposedComponent {...this.props} />
            </div>
          ) : (
            this.checkAndRedirect()
          )}
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
