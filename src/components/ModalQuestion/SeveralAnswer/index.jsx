import React from 'react';

export const SeveralAnswer = props => {
  const {
    variants,
    onChange,
    incCounterInput,
    decCounterInput,
    removeInput
  } = props;

  const getCurrentInput = index => {
    removeInput(index);
  };

  return (
    <div className="input-ask-wrapp">
      {variants.map((input, index) => (
        <div key={input.key} className="flex-row">
          <input
            className={`input margin-b ${
              input.body.length === 0 ? 'is-danger' : ''
            } `}
            type="text"
            placeholder="enter answer"
            onChange={onChange(index)}
            required
          />
          <a
            className="button is-outlined"
            onClick={() => getCurrentInput(index)}
          >
            <span className="icon is-small">
              <i className="fas fa-minus" />
            </span>
          </a>
        </div>
      ))}
      <div className="modal-panel-button margin-b">
        <button onClick={decCounterInput} className="button is-primary">
          -
        </button>
        <button
          onClick={incCounterInput}
          className="button is-primary margin-10 "
        >
          +
        </button>
      </div>
    </div>
  );
};
