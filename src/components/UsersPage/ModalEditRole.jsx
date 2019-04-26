import React from 'react';

export const ModalEditRole = props => {
  const { currentRole, handleSelectChange, changeUserRole } = props;

  return (
    <React.Fragment>
      <h1 className="subtitle" name="currentRole">
        Choose role
      </h1>
      <div className="select margin-20-t">
        <select
          value={currentRole}
          onChange={handleSelectChange}
          name="currentRole"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <button
        className="button is-success margin-20-t"
        onClick={changeUserRole}
      >
        Save
      </button>
    </React.Fragment>
  );
};
