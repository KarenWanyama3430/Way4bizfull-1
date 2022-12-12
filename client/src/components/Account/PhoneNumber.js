import React from "react";

import "../Authenticate/Field.css";

const PhoneNumber = props => {
  return (
    <div className="form-group form-input">
      <strong>
        {props.label} <span style={{ color: "#f76b1a" }}>{props.required}</span>
      </strong>
      <div className="input-group">
        <br />
        <div className="input-group-prepend phone-prepend">
          <span className="input-group-text">+254</span>
        </div>
        <input
          placeholder="712345678"
          className="form-control phone"
          type={props.type}
          {...props.input}
        />
      </div>
      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default PhoneNumber;
