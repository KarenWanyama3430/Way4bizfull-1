import React from "react";

const SellerDropDown = props => {
  return (
    <div className="form-group seller-input-field">
      <h5>{props.label}</h5>
      <select {...props.input} className="form-control">
        <option value="choose">------Please Choose An Option------</option>
        {props.options &&
          props.options.length !== 0 &&
          props.options.map(option => (
            <option key={option.key} value={option.key}>
              {option.text}
            </option>
          ))}
      </select>

      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};

export default SellerDropDown;
