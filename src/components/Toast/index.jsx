import React from 'react';
import './index.css';

const Toast = props => {
  const { text, type } = props;
  return (
    <div className={`notification toast ${!!text ? `${type} show` : ''}`}>
      <p>{text}</p>
      <button className="delete" onClick={props.removeToast} />
    </div>
  );
};

export { Toast };
