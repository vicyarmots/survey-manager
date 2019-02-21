import React from 'react';

import './index.css';

const RegistrForm = props => {
  return (
    <div className="registr-form" action="#">
      <input
        className="registr-form__input_first-name"
        type="text"
        placeholder="First Name"
      />
      <input
        className="registr-form__input_login"
        type="text"
        placeholder="Login(email)"
      />
      <input
        className="registr-form__input_pass"
        type="password"
        placeholder="Password"
      />
      <input
        className="registr-form__input_pass repeat"
        type="password"
        placeholder="Password repeat"
      />
      <button className="registr-for__button_sign-up">Sign Up</button>
    </div>
  );
};

export default RegistrForm;
