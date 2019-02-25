import React from 'react';

import './index.css';

class RegistrForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { firstName: '', login: '', password: '' };

    this.onLoginChange = event => this.setState({ login: event.target.value });

    this.onFirstNameChange = event =>
      this.setState({ firstName: event.target.value });

    this.onPasswordChange = event =>
      this.setState({ password: event.target.value });

    this.onSubmit = event => {
      this.props.changeUser({ isLogin: true });
      console.log(this.state);
      event.preventDefault();
    };
  }

  render() {
    return (
      <div className="registr-form" action="#">
        <input
          className="registr-form__input_first-name"
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.onFirstNameChange}
        />
        <input
          className="registr-form__input_login"
          type="text"
          placeholder="Login(email)"
          value={this.state.login}
          onChange={this.onLoginChange}
        />
        <input
          className="registr-form__input_pass"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <input
          className="registr-form__input_pass repeat"
          type="password"
          placeholder="Password repeat"
        />
        <button onClick={this.onSubmit} className="registr-for__button_sign-up">
          Sign Up
        </button>
      </div>
    );
  }
}

export default RegistrForm;
