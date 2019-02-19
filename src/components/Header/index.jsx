import React, { Component } from 'react';

import './index.css';

class Header extends Component {
  render() {
    console.log(this.props.navItems);
    return (
      <header className="header">
        <div className="header__wrap-logo">
          <img
            className="header__wrap-logo__logo"
            src={this.props.headerLogo.src}
            alt={this.props.headerLogo.alt}
          />
        </div>
        <div className="header__wrap-nav">
          <nav className="header__wrap-nav__nav">
            <ul className="header__wrap-nav__nav__ul">
              {this.props.navItems.map((item, index) => (
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
