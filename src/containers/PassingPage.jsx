import PassingPage from "../components/PassingPage/index.jsx";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPassingSurvey } from "../redux/survey/middleware.js";

const mapStateToProps = store => {
  return {
    survey: store.surveyReducer.passingSurvey
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setPassingSurvey }, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PassingPage)
);
