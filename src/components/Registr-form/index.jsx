import React, { Component } from 'react';

import './index.css';

class RegistrForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className="registr-form" action="#">
        <p>
          <input
            className="registr-form__input_first-name"
            type="text"
            placeholder="First Name"
          />
        </p>
        <p>
          <input
            className="registr-form__input_login"
            type="text"
            placeholder="Login(email)"
          />
        </p>
        <p>
          <input
            className="registr-form__input_pass"
            type="password"
            placeholder="Password"
          />
        </p>
        <p>
          <input
            className="registr-form__input_pass repeat"
            type="password"
            placeholder="Password repeat"
          />
        </p>
        <button className="registr-for__button_sign-up">Sign Up</button>
      </form>
    );
  }
}

export default RegistrForm;
