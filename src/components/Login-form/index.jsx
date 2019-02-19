import React, { Component } from 'react';
import RegistrForm from '../Registr-form/index.jsx'

import './index.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      clicked: true
    });
  }
  render() {
    return (
      <form className="login-form" action="#">
        <input className="form__input_login" type="text" placeholder="Логин"></input>
        <input className="form__input_pass" type="password" placeholder="Пароль"></input>
        <div className='form__link'>
          <a href="#" onClick={this.handleClick} className="form__link_reg">Регистрация</a>
          <a href="#" className="form__link_frgt-pass">Забыли пароль?</a>
        </div>
        <button className="form__button">Войти</button>
        {this.state.clicked && <RegistrForm />}
      </form>
    );
  }
}

export default LoginForm;
