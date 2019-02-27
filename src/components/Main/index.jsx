import React from 'react';
import SiteRouter from '../../Router/index.jsx';

import './index.css';

const Main = props => {
  return (
      <main className="columns is-centered is-vcentered">
        <SiteRouter />
      </main>
  );
};

export default Main;
