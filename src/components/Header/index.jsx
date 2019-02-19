import React, { Component } from 'react';

import './index.css';

const headerLogo = {
  src: 'src/components/header/images/header-logo.png',
  alt: 'header logo'
};

const navItems = [
  {
    link: '#',
    label: 'О компании'
  },
  {
    link: '#',
    label: 'Вход'
  }
];

class Header extends Component {
  render() {
    console.log();
    return (
      <header className="header">
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
              { !!navItems && navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
