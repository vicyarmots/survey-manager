import React from 'react';
import { Redirect } from 'react-router-dom';
import SiteRouter from '../../Router/index.jsx';

import './index.css';

const Main =  ({isLoggedIn}) => {
  return (
    <main>
      <SiteRouter isLoggedIn={isLoggedIn}/>
    </main>
  );
};

export default Main;
