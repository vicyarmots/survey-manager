import React from 'react';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';

import './index.css';

const Header = props => {
  const singOut = () => {
    props.signOut();
    localStorage.removeItem('token');
  };

  console.log(props);

  const getDataForHeader = () => {
    if (!!props.userData) {
      return (
        <React.Fragment>
          <a className="navbar-item" onClick={singOut}>
            Sign Out
          </a>
          <li className="navbar-item">
            <span className="notification username-wrapp">{props.userData.username}</span>
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
        </div>
        <div className="navbar-end">
          <ul className="header__wrap-nav__nav__ul navbar-item">
            <NavLink to="/about-us" className="navbar-item">
              About Us
            </NavLink>
            {getDataForHeader()}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
