import React from 'react';

export const ModalEditNameOrEmail = props => {
  const {
    valueForChange,
    modalTitle,
    handleChange,
    handleValiadate,
    sentEditing
  } = props;
  return (
    <React.Fragment>
      {!!valueForChange.error && (
        <p className="help is-danger input-help ">{valueForChange.error}</p>
      )}
      <h1 className="subtitle margin-20-t">{modalTitle}</h1>
      <input
        type="text"
        onChange={e => handleChange(e)}
        className="input"
        name="valueForChange"
        onBlur={e => handleValiadate(e)}
        placeholder={`enter new ${modalTitle.toLowerCase()}`}
      />

      <button className="button is-success margin-t-10" onClick={sentEditing}>
        Edit
      </button>
    </React.Fragment>
  );
};
