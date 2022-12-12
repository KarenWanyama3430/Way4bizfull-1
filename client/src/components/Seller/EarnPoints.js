import React from "react";

import "./EarnPoints.css";
import { Field, reduxForm, reset } from "redux-form";
import EarnPointsInput from "./EarnPointsInput";
import { connect } from "react-redux";
import validator from "validator";
import {
  sendReferralCode,
  clearReferralErrorAndSuccess,
} from "../../redux/actions";
import { BsArrowLeft, BsCheckCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
// import { Link } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
let email;
class EarnPoints extends React.Component {
  render() {
    email = this.props.email;

    if (this.props.referralSuccess) {
      return (
        <React.Fragment>
          <div className="d-flex align-items-center">
            <div style={{ flex: "1" }}>
              <IconContext.Provider
                value={{ className: "arrow-icon ml-3 my-2" }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.clearReferralErrorAndSuccess()}
                  className="d-flex align-items-center"
                >
                  <BsArrowLeft />
                </div>
              </IconContext.Provider>
            </div>

            <div className="ml-1" style={{ flex: "2" }}></div>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <BsCheckCircle style={{ fontSize: "100px", color: "#4BB543" }} />
          </div>
          <h6 style={{ textAlign: "center" }}>
            Congrats,the referral has been sent.
          </h6>
        </React.Fragment>
      );
    }

    if (this.props.referralError) {
      return (
        <React.Fragment>
          <div className="d-flex align-items-center">
            <div style={{ flex: "1" }}>
              <IconContext.Provider
                value={{ className: "arrow-icon ml-3 my-1" }}
              >
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => this.props.clearReferralErrorAndSuccess()}
                  className="d-flex align-items-center"
                >
                  <BsArrowLeft />
                </div>
              </IconContext.Provider>
            </div>

            <div className="ml-1" style={{ flex: "2" }}></div>
          </div>
          <div className="d-flex mb-3 align-items-center justify-content-center mb-3">
            <AiOutlineExclamationCircle
              style={{ fontSize: "100px", color: "#f76b1a" }}
            />
          </div>
          <h6 style={{ textAlign: "center" }}>
            This email exists in the system.
          </h6>
        </React.Fragment>
      );
    }
    return (
      <div className="container py-2" style={{ backgroundColor: "#fff" }}>
        {/* show this first */}
        <h6>
          You currently have {this.props.points} points. To earn more points
          refer many sellers to sell on our platform.
        </h6>
        <h6 className="my-2">
          Lets get you more points. Key in the email of the seller you want to
          refer. Then press send to send the referral.
        </h6>
        <form
          onSubmit={this.props.handleSubmit((formValues) =>
            this.props.sendReferralCode(
              {
                ...formValues,
                sellerName: `${this.props.firstName} ${this.props.lastName}`,
              },
              reset
            )
          )}
        >
          <div
            className="row no-gutters align-items-center m-0 p-0"
            style={{ height: "30px" }}
          >
            <Field
              component={EarnPointsInput}
              placeholder="test@gmail.com"
              type="text"
              name="points"
              buttonClickHandler={this.handleButtonClick}
            />
          </div>
        </form>{" "}
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (!formValues.points) {
    errors.points = "Please fill in this field";
  }
  if (formValues.points && !validator.isEmail(formValues.points.trim())) {
    errors.points = "Please enter a valid email or phone number";
  }
  if (formValues.points && formValues.points === email) {
    errors.points = "Invalid email";
  }

  return errors;
};
const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email,
    firstName: state.auth.user.firstName,
    lastName: state.auth.user.lastName,
    points: state.auth.user.points,
    referralError: state.seller.referralError,
    referralSuccess: state.seller.referralSuccess,
  };
};
export default reduxForm({ form: "EarnPoints", validate })(
  connect(mapStateToProps, { sendReferralCode, clearReferralErrorAndSuccess })(
    EarnPoints
  )
);
