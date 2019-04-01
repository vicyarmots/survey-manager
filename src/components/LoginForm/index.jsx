import React from 'react';
import { Link } from 'react-router-dom';
import { schemaUser, Validation } from 'helpers/validation.js';
import './index.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: { body: '', error: null },
      password: { body: '', error: null }
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.setUserUseToken();
    }
  }

  onSubmit = () => {
    const isValid = !Object.keys(this.state).some(
      key => !!this.state[key].error || !this.state[key].body
    );

    if (!!isValid) {
      this.props.setUser({
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

  keyPressed = event => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  };

  render() {
    const { login, password } = this.state;

    console.log(this.props.error);

    return (
      <div className="login-form columns is-multiline is-centered is-vcentered box">
        <div className="input-wrapp control  column is-10">
          <div className="is-full has-text-centered">
            {!!this.props.error && (
              <p className="help is-danger">{this.props.error}</p>
            )}
          </div>

          <input
            className="login-form__input_login input"
            type="text"
            name={'login'}
            placeholder="Login(email)"
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            onKeyPress={this.keyPressed}
          />
          {!!login.error && (
            <p className="help is-danger input-help">{login.error}</p>
          )}
        </div>

        <div className="input-wrapp control  column is-10">
          <input
            className="login-form__input_pass input"
            type="password"
            name={'password'}
            placeholder="Password"
            onChange={this.handleChange}
            onBlur={this.handleValidate}
            onKeyPress={this.keyPressed}
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
