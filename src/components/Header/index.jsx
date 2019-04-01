import React from 'react';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';

import './index.css';

const Header = () => {
  const headerLogo = {
    src:
      'https://raw.githubusercontent.com/AntonProtas/survey-manager/features/redux-store/src/components/Header/images/header-logo.PNG',
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
                <li key={shortid.generate()} className="navbar-item">
                  <NavLink to={item.link}>{item.label}</NavLink>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
