import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';

const Header = props => {
  const headerLogo = {
    src: 'src/components/header/images/header-logo.png',
    alt: 'header logo'
  };

  const navItems = [
    {
      link: '/',
      label: 'About Us'
    },
    {
      link: '/',
      label: 'Log In'
    }
  ];
  return (
    <header>
      <div className="header__wrap-logo">
        <img
          className="header__wrap-logo__logo"
          src={headerLogo.src}
          alt={headerLogo.alt}
        />
      </div>
      <div className="header__wrap-nav">
        <nav className="header__wrap-nav__nav">
          <ul className="header__wrap-nav__nav__ul">
            {!!navItems &&
              navItems.map(item => (
                <Router>
                  <li>
                    <NavLink to={item.link}>{item.label}</NavLink>
                  </li>
                </Router>
              ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
