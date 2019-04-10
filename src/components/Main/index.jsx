import React from 'react';
import SiteRouter from '../../Router/index.jsx';
import './index.css';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Main = () => {
  return (
    <main>
      <SiteRouter />
      <NotificationContainer />
    </main>
  );
};

export default Main;
