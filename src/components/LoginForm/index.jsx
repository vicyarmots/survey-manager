import React from 'react';
import { Link } from 'react-router-dom';
import {
  schemaPassword,
  schemaLogin,
  validation
} from '../../helpers/validation.js';
import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: { body: '', error: null },
      password: { body: '', error: null }
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

  onPasswordChange = ({ target }) =>
    this.setState({ password: { ...this.state.password, body: target.value } });

  onLoginChange = ({ target }) =>
    this.setState({ login: { ...this.state.password, body: target.value } });

  loginValidate = ({ target }) => {
    const { error } = validation(target.value, schemaLogin, 'login');
    if (!!error) {
      this.setState({
        login: {
          ...this.state.login,
          error: error.details[0].message.replace('"value"', '')
        }
      });
    } else {
      this.setState({
        login: {
          ...this.state.login,
          error: null
        }
      });
    }
  };

  passwordValidate = ({ target }) => {
    const { error } = validation(target.value, schemaPassword, 'password');
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
          password: {
            ...this.state.password,
            error: error.details[0].message.replace('"value"', '')
          }
        });
      }
    } else if (error === null) {
      this.setState({
        password: {
          ...this.state.password,
          error: null
        }
      });
    }
  };

  render() {
    const { login, password } = this.state;

    return (
      <div className="login-form columns is-multiline is-centered is-vcentered box">
        <div className="input-wrapp control  column is-10">
          <input
            className="login-form__input_login input"
            type="text"
            placeholder="Login(email)"
            onChange={this.onLoginChange}
            onBlur={this.loginValidate}
          />
          {!!login.error && (
            <p className="help is-danger input-help">{login.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="login-form__input_pass input"
            type="password"
            placeholder="Password"
            onChange={this.onPasswordChange}
            onBlur={this.passwordValidate}
          />
          {!!password.error && (
            <p className="help is-danger input-help">{password.error}</p>
          )}
        </div>

        <div className="login-form__wrap-button column is-10">
          <Link className="sign-up--link" to="/sign-up">
            Sign Up
          </Link>
          <button
            className="button is-info login-form__button_sign-in"
            onClick={this.onSubmit}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
