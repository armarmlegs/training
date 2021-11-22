import React from "react";

const Input = ({ label, name, onChange, value, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>
        {label}
        <input
          autoFocus
          name={name}
          onChange={onChange}
          value={value}
          id={name}
          type={type}
          className="form-control"
          error={error}
        />
      </label>
      {error && <div className="div alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
