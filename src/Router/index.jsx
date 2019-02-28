import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegistrForm from 'containers/RegistrForm.jsx';
import LoginForm from 'containers/LoginForm.jsx';
import SurveyPage from '../components/SurveyPage/index.jsx';
import './index.css';

const SiteRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/sign-up" component={RegistrForm} />
        <Route path="/home" component={SurveyPage} />
      </Switch>
    </Router>
  );
};

export default SiteRouter;
