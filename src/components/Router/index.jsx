import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store/configureStore.js';
import RegistrForm from '../Registr-form/index.jsx';
import LoginForm from '../../controllers/LoginForm.jsx';
import './index.css';

const SiteRouter = props => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/sign-up" component={RegistrForm} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default SiteRouter;
