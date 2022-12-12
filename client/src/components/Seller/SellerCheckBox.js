import React from "react";

const SellerCheckBox = props => {
  return (
    <div
      className="my-4"
      style={{ width: "90%", margin: "auto", paddingLeft: "10px" }}
    >
      <div className=" checkbox">
        <input type={props.type} {...props.input} id="checkbox_3" />
        <label htmlFor="checkbox_3" className="m-0">
          <h5>{props.label}</h5>
        </label>
      </div>
    </div>
  );
};

export default SellerCheckBox;
