import React from "react";

const Input = ({ label, name, onChange, value }) => {
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
          type="text"
          className="form-control"
        />
      </label>
    </div>
  );
};

export default Input;
