import { connect } from 'react-redux';
import React from 'react';
import Header from '../../components/Header/index.jsx';
import Footer from '../../components/Footer/index.jsx';
import Main from '../../components/Main/index.jsx';

import './index.css';

const App = props => {
  const { name, surname, age } = props.user;
  return (
    <React.Fragment>
      <Header />
      <Main />
      <div>
        {name}
        <br />
        {surname}
        <br />
        {age}
      </div>
      <Footer />
    </React.Fragment>
  );
};

const mapStateToProps = store => {
  console.log(store);
  return {
    user: store.user
  };
};

export default connect(mapStateToProps)(App);
