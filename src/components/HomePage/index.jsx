import React from 'react';
import { getDataJson, getDataDocx } from '../../api/index.js';

export const HomePage = () => {
  return (
    <section className="hero-body">
      <h1 className="title">Home Page</h1>
      <div className="container notification">
        <button
          onClick={() => getDataJson()}
          className="button is-info margin-10-r"
        >
          Get Data Json
        </button>
        <button onClick={() => getDataDocx()} className="button is-info">
          Get Data Docx
        </button>
      </div>
    </section>
  );
};
