import React, { Component } from 'react';

import './index.css';

class Header extends Component {
  render() {
    const headerLogo = {
      src: 'src/components/header/images/header-logo.png',
      alt: 'header logo'
    };

    const navItems = [
      {
        link: '#',
        label: 'About us'
      },
      {
        link: '#',
        label: 'Log In'
      }
    ];
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
              {!!navItems &&
                navItems.map((item, index) => (
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
