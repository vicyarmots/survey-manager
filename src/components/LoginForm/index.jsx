import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { login: '', password: '' };
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.setUser(true);
  };

  onPasswordChange = event => this.setState({ password: event.target.value });

  onLoginChange = event => this.setState({ login: event.target.value });

  render() {
    return (
      <div className="login-form columns is-multiline is-centered is-vcentered box">
        <div className="field">
          <div className="control">
            <input
              className="login-form__input_login input is-medium"
              type="text"
              placeholder="Login(email)"
              value={this.state.login}
              onChange={this.onLoginChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className="login-form__input_pass input is-medium"
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </div>
        </div>

        <div className="login-form__wrap-button column is-10">
          <Link className="" to="/sign-up">
            Sign Up
          </Link>
          <button
            onClick={this.onSubmit}
            className="button login-form__button_sign-in is-link"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
