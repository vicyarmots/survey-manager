import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Dropdown from '../../common/Dropdown/index.jsx';
import './index.css';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownIsOpen: false,
      usernameDropdownIsOpen: false
    };
  }

  singOut = () => {
    this.props.signOut();
    localStorage.removeItem('token');
  };

  setDropdownTrigger = () => {
    return (
      <span className="notification username-wrapp">
        <span>{this.props.userData.username}</span>
        {this.props.userData.role === 'admin' ? <span> [Admin] </span> : null}
        <span class="icon is-small">
          <i class="fas fa-angle-down" aria-hidden="true" />
        </span>
      </span>
    );
  };

  setDropdownContent = () => {
    return (
      <React.Fragment>
        <div class="dropdown-item">
          <span>Signed is as</span>
          <br />
          <strong>{this.props.userData.username}</strong>
        </div>
        <hr class="dropdown-divider" />
        <NavLink className="dropdown-item" to="/setting">
          Profile settings
        </NavLink>
        <hr class="dropdown-divider" />
        <a className="dropdown-item" onClick={this.singOut}>
          Sign Out
        </a>
      </React.Fragment>
    );
  };

  getDataForHeader = () => {
    const { usernameDropdownIsOpen } = this.state;
    if (!!this.props.userData) {
      return (
        <React.Fragment>
          <NavLink className="navbar-item" to="/home">
            Home
          </NavLink>
          <li
            className="navbar-item"
            onClick={() =>
              this.setState({
                usernameDropdownIsOpen: !this.state.usernameDropdownIsOpen
              })
            }
          >
            <Dropdown
              setDropdownTrigger={this.setDropdownTrigger}
              dropdownIsOpen={usernameDropdownIsOpen}
              setDropdownContent={this.setDropdownContent}
            />
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
