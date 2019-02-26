import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { login: '', password: '' };
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.setUser(true);
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  render() {
    return (
      <div className="login-form" action="#">
        <input
          className="login-form__input_login"
          type="text"
          placeholder="Login(email)"
          value={this.state.login}
          onChange={this.onLoginChange}
        />
        <input
          className="login-form__input_pass"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onPasswordChange}
        />
        <div className="login-form__wrap-button">
          <Link to="/sign-up">Sign Up</Link>
          <button
            onClick={this.onSubmit}
            className="login-form__button_sign-in"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
