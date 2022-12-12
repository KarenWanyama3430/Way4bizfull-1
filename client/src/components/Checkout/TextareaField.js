import React from "react";

const TextareaForm = (props) => {
  return (
    <div className="form-group form-input2">
      <strong>{props.label}</strong>
      <br />
      <textarea {...props.input} className="form-control" rows="5"></textarea>

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default TextareaForm;
