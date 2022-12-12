import React from "react";

const AuthField = (props) => {
  return (
    <div className="form-group mt-3 seller-input-field">
      <h5>
        {props.label} <span style={{ color: "#f76b1a" }}>{props.required}</span>
      </h5>

      <input className="form-control" type={props.type} {...props.input} />

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default AuthField;
