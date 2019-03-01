import React from 'react';
import Header from 'components/Header/index.jsx';
import Footer from 'components/Footer/index.jsx';
import Main from 'components/Main/index.jsx';

import './index.css';

const App = ({ isLoggedIn }) => {
  return (
    <React.Fragment>
      <Header />
      <Main isLoggedIn={isLoggedIn} />
      <Footer />
    </React.Fragment>
  );
};

export default App;
