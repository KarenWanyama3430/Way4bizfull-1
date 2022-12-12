import React from "react";

const VerificationField = (props) => {
  return (
    <div className="form-group form-input">
      <div style={{ textAlign: "center" }}>
        <strong>{props.label}</strong>
      </div>
      <input
        className="form-control"
        type={props.type}
        {...props.input}
        placeholder="123456"
      />

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default VerificationField;
