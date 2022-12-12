import React from "react";

const SellerTextArea = props => {
  return (
    <div className="form-group form-input">
      <strong>
        {props.label} <span style={{ color: "#f76b1a" }}>{props.required}</span>
      </strong>
      <br />
      <textarea {...props.input} className="form-control" rows="5"></textarea>

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default SellerTextArea;
