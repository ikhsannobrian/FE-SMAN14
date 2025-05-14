import React from "react";

const FormInput = ({ Label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <label className="label">
        <span className="label-text capitalize">{Label}</span>
      </label>
      <input
        type={type}
        placeholder={Label}
        className="input input-bordered"
        name={name}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default FormInput;