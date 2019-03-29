import React from 'react';

export const SeveralAnswer = props => {
  const {
    variants,
    onChange,
    incCounterInput,
    decCounterInput,
    removeInput,
    AnswerValidate
  } = props;

  return (
    <div className="input-ask-wrapp">
      {variants.map((input, index) => (
        <div key={input.key} className="flex-row input-wrapp quest-input-title">
          <input
            className={`input margin-b ${!input.body ? 'is-danger' : ''} `}
            type="text"
            placeholder="enter answer"
            onChange={onChange(index)}
            onBlur={e => AnswerValidate(e.target.value, index)}
            required
          />
          {!!variants[index].error && (
            <p className="input-help help is-danger answer-help">
              {variants[index].error}
            </p>
          )}

          <a className="button is-outlined" onClick={() => removeInput(index)}>
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
