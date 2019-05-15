import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <section className="hero-body text-center">
      <h1 className="title">Let's create surveys!</h1>
      <div className="container">
        <img
          src="https://s3.amazonaws.com/peoplepng/wp-content/uploads/2018/06/08112830/Survey-PNG-Image.png"
          alt=""
        />
      </div>
    </section>
  );
};
