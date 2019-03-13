import React from 'react';
export const OneAnswer = props => {
  return (
    <div className="input-ask-wrapp">
      {props.variants.map((input, index) => (
        <div key={input.key} className="flex-row">
          <input
            className={`input margin-b ${
              input.body.length === 0 ? 'is-danger' : ''
            } `}
            type="text"
            placeholder="enter answer"
            onChange={props.onChange(index)}
            required
          />
        </div>
      ))}
    </div>
  );
};
