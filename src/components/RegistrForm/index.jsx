import React from 'react';

import { schemaUser, Validation } from '../../helpers/validation.js';

import './index.css';

class RegistrForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: { body: '', error: null },
      login: { body: '', error: null },
      password: { body: '', error: null },
      rePass: { body: '', error: null }
    };
  }

  onSubmit = () => {
    const isValid = !Object.keys(this.state).some(
      key => !!this.state[key].error || !this.state[key].body
    );
    if (!!isValid) {
      this.props.signUpUserAsync({
        username: this.state.firstName.body,
        email: this.state.login.body,
        password: this.state.password.body
      });
    }
  };

  handleChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: {
        ...this.state[target.name],
        body: target.value
      }
    });
  };

  handleValidate = ({ target }) => {
    Validation(target.value, schemaUser, target.name, this);
  };

  handleRePassValidate = ({ target }) => {
    if (target.value === this.state.password.body) {
      this.setState({
        rePass: { ...this.state.rePass, error: null }
      });
    } else {
      this.setState({
        rePass: {
          ...this.state.rePass,
          error: 'passwords do not match please retype'
        }
      });
    }
  };

  onkeyPressed = event => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    const { firstName, login, password, rePass } = this.state;
    return (
      <div className="registr-form columns is-multiline is-centered is-vcentered box">
        <div className="input-wrapp control  column is-10">
          <div className="is-full has-text-centered">
            {!!this.props.error && (
              <p className="help is-danger">{this.props.error}</p>
            )}
          </div>
          <input
            className="registr-form__input_first-name input"
            type="text"
            name={'firstName'}
            placeholder="First Name"
            value={this.state.firstName.body}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            onKeyPress={this.onkeyPressed}
          />
          {!!firstName.error && (
            <p className="help is-danger input-help">{firstName.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="registr-form__input_login input"
            type="text"
            name={'login'}
            placeholder="Login(email)"
            value={this.state.login.body}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            onKeyPress={this.onkeyPressed}
          />
          {!!login.error && (
            <p className="help is-danger input-help">{login.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="registr-form__input_pass input"
            type="password"
            name={'password'}
            placeholder="Password"
            value={this.state.password.body}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            onKeyPress={this.onkeyPressed}
          />
          {!!password.error && (
            <p className="help is-danger input-help">{password.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="registr-form__input_pass repeat input"
            type="password"
            name={'rePass'}
            placeholder="Password repeat"
            value={rePass.body}
            onChange={this.handleChange}
            onBlur={this.handleRePassValidate}
            onKeyPress={this.onkeyPressed}
            disabled={!!password.error}
          />
          {!!rePass.error && (
            <p className="help is-danger input-help">{rePass.error}</p>
          )}
        </div>

        <div className="column is-full">
          <div className="is-centered columns">
            <button
              onClick={this.onSubmit}
              className="registr-for__button_sign-up button is-link"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegistrForm;
