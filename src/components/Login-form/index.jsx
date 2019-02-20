import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="login-form" action="#">
        <p>
          <input
            className="login-form__input_login"
            type="text"
            placeholder="Login(email)"
          />
        </p>
        <p>
          <input
            className="login-form__input_pass"
            type="password"
            placeholder="Password"
          />
        </p>
        <div className="login-form__wrap-button">
          <Link to="/sign-up">Sign Up</Link>
          <button className="login-form__button_sign-in">Log In</button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
