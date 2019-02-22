import { connect } from 'react-redux';
import React from 'react';
import Header from '../../components/Header/index.jsx';
import Footer from '../../components/Footer/index.jsx';
import Main from '../../components/Main/index.jsx';
import setUser from '../../redux/actions/setUser.js';

import './index.css';



const App = props => {
  console.log(props.user);
  return (
    <React.Fragment>`
      <Header/>
      <Main changeUser={props.changeUser}/>
      <Footer />
    </React.Fragment>
  );
};


const mapStateToProps = store => {
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => ({
  changeUser: user => dispatch(setUser(user))
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
