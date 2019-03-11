import React from "react";
import shortid from "shortid";

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
        <div key={shortid.generate()} className="flex-row">
          <input
            className="input margin-b"
            type="text"
            placeholder="enter answer"
            value={input}
            onChange={onChange(index)}
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
