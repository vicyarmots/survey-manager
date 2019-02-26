import React from 'react';

import './index.css';

class RegistrForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = { firstName: '', login: '', password: '' };
  }

  render() {
    

    const onLoginChange = event => this.setState({ login: event.target.value });

    const onFirstNameChange = event =>
      this.setState({ firstName: event.target.value });

    const onPasswordChange = event =>
      this.setState({ password: event.target.value });

    const onSubmit = event => {
      this.props.changeUser({ isLoggedIn: true });
      event.preventDefault();
    };
    return (
      <div className="registr-form" action="#">
        <input
          className="registr-form__input_first-name"
          type="text"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={onFirstNameChange}
        />
        <input
          className="registr-form__input_login"
          type="text"
          placeholder="Login(email)"
          value={this.state.login}
          onChange={onLoginChange}
        />
        <input
          className="registr-form__input_pass"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={onPasswordChange}
        />
        <input
          className="registr-form__input_pass repeat"
          type="password"
          placeholder="Password repeat"
        />
        <button onClick={onSubmit} className="registr-for__button_sign-up">
          Sign Up
        </button>
      </div>
    );
  }
}

export default RegistrForm;
