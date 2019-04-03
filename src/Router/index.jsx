import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegistrForm from 'containers/RegistrForm.jsx';
import LoginForm from 'containers/LoginForm.jsx';
import SurveyPage from 'containers/SurveyPage.jsx';
import { NoMatch } from 'components/NoMatch/index.jsx';
import { HomePage } from 'components/HomePage/index.jsx';
import { checkAuth } from 'utils/requiresLog.jsx';
import Surveys from 'containers/Surveys.jsx';
import SurveyContainer from 'containers/SurveyContainer.jsx';
import { AboutUs } from 'components/AboutUs/index.jsx';
import './index.css';
import PassingPage from 'containers/PassingPage.jsx';
import SurveyResultPage from 'containers/SurveyResultPage.jsx';

const SiteRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/sign-up" component={RegistrForm} />
      <Route exact path="/about-us" component={AboutUs} />
      <Route exact path="/home" component={checkAuth(HomePage)} />
      <Route exact path="/survey-page" component={checkAuth(SurveyPage)} />
      <Route exact path="/surveys" component={checkAuth(Surveys)} />
      <Route path="/surveys/:path" component={checkAuth(SurveyContainer)} />
      <Route exact path="/passing" component={checkAuth(HomePage)} />
      <Route path="/passing/:path" component={PassingPage} />
      <Route exact path="/survey-result" component={checkAuth(HomePage)} />
      <Route
        path="/survey-result/:path"
        component={checkAuth(SurveyResultPage)}
      />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default SiteRouter;
