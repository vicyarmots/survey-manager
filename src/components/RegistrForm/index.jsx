import React from 'react';

import {
  schemaPassword,
  schemaLogin,
  schemaUserName,
  validation
} from '../../helpers/validation.js';

import './index.css';

class RegistrForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: { body: '', error: null },
      login: { body: '', error: null },
      password: { body: '', error: null },
      repePassword: { body: '', error: null }
    };
  }

  onSubmit = e => {
    e.preventDefault();

    if (
      !Object.keys(this.state).some(key => !!this.state[key].error !== false) &&
      Object.keys(this.state).some(key => this.state[key].body.length > 0)
    ) {
      this.props.setUser(true);
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
    let currentSchema = {};

    if (target.name === 'firstName') {
      currentSchema = schemaUserName;
    }
    if (target.name === 'login') {
      currentSchema = schemaLogin;
    }
    if (target.name === 'password' || target.name === 'repePassword') {
      currentSchema = schemaPassword;
    }

    const { error } = validation(target.value, currentSchema, target.name);

    if (!!error) {
      if (error.details[0].message.search(/pattern/) > 0) {
        if (error.details[0].message.split(' ').pop().length > 17) {
          this.setState({
            password: {
              ...this.state.password,
              error: 'password must have at least one capital letter'
            }
          });
        } else {
          this.setState({
            password: {
              ...this.state.password,
              error: 'password must have two digits'
            }
          });
        }
      } else {
        this.setState({
          ...this.state,
          [target.name]: {
            ...this.state[target.name],
            error: error.details[0].message.replace('"value"', '')
          }
        });
      }
    } else if (error === null) {
      this.setState({
        ...this.state,
        [target.name]: {
          ...this.state[target.name],
          error: null
        }
      });
    }
  };

  onBlurRepePassword = ({ target }) => {
    if (target.value === this.state.password.body) {
      this.setState({
        repePassword: { ...this.state.repePassword, error: null }
      });
    } else {
      this.setState({
        repePassword: {
          ...this.state.repePassword,
          error: 'passwords do not match please retype'
        }
      });
    }
  };

  render() {
    const { firstName, login, password, repePassword } = this.state;
    return (
      <div className="registr-form columns is-multiline is-centered is-vcentered box">
        <div className="input-wrapp control  column is-10">
          <input
            className="registr-form__input_first-name input"
            type="text"
            name={'firstName'}
            placeholder="First Name"
            value={this.state.firstName.body}
            onChange={this.handleChange}
            onBlur={this.handleValidate}
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
          />
          {!!password.error && (
            <p className="help is-danger input-help">{password.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="registr-form__input_pass repeat input"
            type="password"
            name={'repePassword'}
            placeholder="Password repeat"
            value={this.state.repePassword.body}
            onChange={this.handleChange}
            onBlur={this.onBlurRepePassword}
            disabled={!!password.error}
          />
          {!!repePassword.error && (
            <p className="help is-danger input-help">{repePassword.error}</p>
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
