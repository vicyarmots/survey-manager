import React, { Component } from 'react';
import Header from '../Header/index.jsx';

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

class App extends Component {
  render() {
    return <Header headerLogo={headerLogo} navItems={navItems} />;
  }
}

export default App;
