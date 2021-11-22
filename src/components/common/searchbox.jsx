import React from "react";

const SearcBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      ></input>
    </div>
  );
};

export default SearcBox;
