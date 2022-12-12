import React from "react";

const AddReviewForm = (props) => {
  return (
    <div>
      <div className="form-group my-4">
        <input
          type={props.type}
          {...props.input}
          placeholder={props.placeholder}
          className="form-control review-form-field"
        />
        <p className="d-flex justify-content-start" style={{ color: "red" }}>
          {props.meta.touched && props.meta.error}
        </p>
      </div>
    </div>
  );
};

export default AddReviewForm;
