import React from "react";

const SellerTextArea = (props) => {
  return (
    <div className="form-group mt-3">
      <label htmlFor={props.htmlFor}>
        {props.label} <span style={{ color: "#f76b1a" }}>{props.required}</span>
      </label>
      <textarea
        className="form-control"
        type={props.type}
        {...props.input}
        id={props.htmlFor}
        placeholder={props.placeholder}
      ></textarea>

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default SellerTextArea;
