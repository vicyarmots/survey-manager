import React from 'react';
export const OneAnswer = props => {
  const { variants, onChange, AnswerValidate } = props;

  return (
    <div className="input-ask-wrapp">
      {props.variants.map((input, index) => (
        <div key={input.key} className="flex-row input-wrapp quest-input-title">
          <input
            className={`input margin-b ${
              !input.body.length ? 'is-danger' : ''
            } `}
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
        </div>
      ))}
    </div>
  );
};
