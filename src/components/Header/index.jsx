import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';

const Header = props => {
  const headerLogo = {
    src: 'src/components/header/images/header-logo.png',
    alt: 'header logo'
  };

  const navItems = [
    {
      link: '/about-us',
      label: 'About Us'
    },
    {
      link: '/',
      label: 'Log In'
    }
  ];
  return (
    <header>
      <nav className="navbar is-light">
        <div className="navbar-brand">
          <div className="navbar-item header__wrap-logo__logo">
            <img className="" src={headerLogo.src} alt={headerLogo.alt} />
          </div>
        </div>
        <div className="navbar-end">
          <ul className="header__wrap-nav__nav__ul navbar-item ">
            {!!navItems &&
              navItems.map(item => (
                <Router>
                  <li className="navbar-item">
                    <NavLink to={item.link}>{item.label}</NavLink>
                  </li>
                </Router>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
