import React from 'react';
import SiteRouter from '../Router/index.jsx';

import './index.css';

const Main = props => {
  const tempFun = () => {
    const input = document.querySelector('.temp-input');
    props.changeUser({name:input.value});
  }

  return (
    <main>
      <div>
        <input className='temp-input' type="text"/>
        <button onClick={tempFun} className='temp-btn'>add User</button>
      </div>
      <SiteRouter />
    </main>
  );
};

export default Main;
