import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegistrForm from "containers/RegistrForm.jsx";
import LoginForm from "containers/LoginForm.jsx";
import SurveyPage from "../components/SurveyPage/index.jsx";
import { NoMatch } from "../components/NoMatch/index.jsx";
import { checkAuth } from "../utils/requiresLog.jsx";
import "./index.css";

const SiteRouter = props => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={LoginForm} />
        <Route path="/sign-up" component={RegistrForm} />
        <Route path="/home" component={checkAuth(SurveyPage)} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
};

export default SiteRouter;
