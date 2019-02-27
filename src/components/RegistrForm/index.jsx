import React from 'react';

import './index.css';

class RegistrForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { firstName: '', login: '', password: '' };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.setUser(true);
  };

  onPasswordChange = event => this.setState({ password: event.target.value });

  onLoginChange = event => this.setState({ login: event.target.value });

  onFirstNameChange = event => this.setState({ password: event.target.value });

  render() {
    return (
      <div className="registr-form columns is-multiline is-centered is-vcentered box">
        <div className="control">
          <input
            className="registr-form__input_first-name input is-medium"
            type="text"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.onFirstNameChange}
          />
        </div>

        <div className="control">
          <input
            className="registr-form__input_login input is-medium"
            type="text"
            placeholder="Login(email)"
            value={this.state.login}
            onChange={this.onLoginChange}
          />
        </div>

        <div className="control">
          <input
            className="registr-form__input_pass input is-medium"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
        </div>

        <div className="control">
          <input
            className="registr-form__input_pass repeat input is-medium"
            type="password"
            placeholder="Password repeat"
          />
        </div>

        <div className="control column is-4">
          <button
            onClick={this.onSubmit}
            className="registr-for__button_sign-up button is-link"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

export default RegistrForm;
