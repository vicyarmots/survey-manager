import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

const LoginForm = props => {
  return (
    <div className="login-form" action="#">
      <input
        className="login-form__input_login"
        type="text"
        placeholder="Login(email)"
      />
      <input
        className="login-form__input_pass"
        type="password"
        placeholder="Password"
      />
      <div className="login-form__wrap-button">
        <Link to="/sign-up">Sign Up</Link>
        <button className="login-form__button_sign-in">Log In</button>
      </div>
    </div>
  );
};

export default LoginForm;
