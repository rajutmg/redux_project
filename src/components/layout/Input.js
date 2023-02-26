import React from "react";

const Input = (props) => {
  const {
    type = "text",
    placeholder = "Enter PlaceHolder",
    name,
    value,
    className = "form-control",
    onChange,
  } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      className={className}
      onChange={onChange}
    />
  );
};

export default Input;
