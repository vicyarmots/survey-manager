import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownIsOpen: false
    };
  }

  singOut = () => {
    this.props.signOut();
    localStorage.removeItem('token');
  };

  getDataForHeader = () => {
    if (!!this.props.userData) {
      return (
        <React.Fragment>
          <a className="navbar-item" onClick={this.singOut}>
            Sign Out
          </a>
          <li className="navbar-item">
            <span className="notification username-wrapp">
              {this.props.userData.username}
              {this.props.userData.role === 'admin' ? (
                <span> [Admin] </span>
              ) : null}
            </span>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <NavLink to="/" className="navbar-item">
          Sign In
        </NavLink>
      );
    }
  };

  render() {
    return (
      <header>
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <div className="navbar-item header__wrap-logo__logo">
              <img
                className=""
                src="https://raw.githubusercontent.com/AntonProtas/survey-manager/features/redux-store/src/components/Header/images/header-logo.PNG"
                alt="header logo"
              />
            </div>
            <span
              className="navbar-burger burger"
              data-target="navMenu"
              onClick={() =>
                this.setState({
                  dropdownIsOpen: !this.state.dropdownIsOpen
                })
              }
            >
              <span />
              <span />
              <span />
            </span>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${
              !!this.state.dropdownIsOpen ? 'is-active' : ''
            }`}
          >
            <div className="navbar-end margin-10-r">
              <NavLink className="navbar-item" to="/about-us">
                About Us
              </NavLink>
              {this.getDataForHeader()}
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
