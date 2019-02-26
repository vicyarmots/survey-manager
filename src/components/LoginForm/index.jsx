import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { login: '', password: '' };
  }

  render() {
    const onLoginChange = event => this.setState({ login: event.target.value });

    const onPasswordChange = event =>
      this.setState({ password: event.target.value });

    const onSubmit = event => {
      this.props.changeUser({ isLoggedIn: true });
      event.preventDefault();
      console.log(this.props);
    };

    return (
      <div className="login-form" action="#">
        <input
          className="login-form__input_login"
          type="text"
          placeholder="Login(email)"
          value={this.state.login}
          onChange={onLoginChange}
        />
        <input
          className="login-form__input_pass"
          type="password"
          placeholder="Password"
          value={this.state.password}
          onChange={onPasswordChange}
        />
        <div className="login-form__wrap-button">
          <Link to="/sign-up">Sign Up</Link>
          <button onClick={onSubmit} className="login-form__button_sign-in">
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginForm;
