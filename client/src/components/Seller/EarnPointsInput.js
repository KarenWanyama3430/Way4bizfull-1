import React from "react";
import { connect } from "react-redux";

const EarnPointsInput = props => {
  return (
    <div
      className="form-group input-group"
      style={{ height: "30px", position: "relative" }}
    >
      <input
        className="form-control referral-input"
        type={props.type}
        {...props.input}
        placeholder={props.placeholder}
      />
      <div className="input-group-append">
        <button
          disabled={props.invalid || props.pristine}
          id="referral-btn"
          style={{ height: "30px !important", width: "80px" }}
          // onClick={props.buttonClickHandler}
        >
          {props.referralCodeLoading && (
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {props.referralCodeLoading ? <span>...</span> : <span>Send</span>}
        </button>
      </div>

      <div style={{ color: "red", position: "absolute", top: "35px" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    referralCodeLoading: state.seller.referralCodeLoading
  };
};
export default connect(mapStateToProps)(EarnPointsInput);
