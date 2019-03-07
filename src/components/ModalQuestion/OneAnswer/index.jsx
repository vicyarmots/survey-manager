import React from 'react';
export const OneAnswer = props => {
  return (
    <input
      className="input margin-b"
      type="text"
      placeholder="enter answer"
      onChange={props.addVariant}
    />
  );
};
