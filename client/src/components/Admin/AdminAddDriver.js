import React from "react";

import "./AdminAddDriver.css";
import { reduxForm, Field } from "redux-form";
import AuthField from "../Authenticate/AuthField";
import validator from "validator";
import { riderRegister } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PhoneNumber from "../Account/PhoneNumber";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import MobileLogo from "../Header/MobileLogo";

class AdminAddDriver extends React.Component {
  render() {
    return (
      <div>
        <MobileLogo />
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <h3 style={{ textAlign: "center" }} className="my-2">
          Driver Form
        </h3>
        <form
          onSubmit={this.props.handleSubmit(formValues => {
            this.props.riderRegister(formValues, this.props.history);
          })}
        >
          <Field
            required="*"
            type="text"
            name="firstName"
            label="First Name"
            component={AuthField}
          />
          <Field
            required="*"
            type="text"
            name="lastName"
            label="Last Name"
            component={AuthField}
          />

          <Field
            required="*"
            type="text"
            name="email"
            label="Email"
            component={AuthField}
          />
          <div className="form-primary-error">
            {this.props.riderRegisterError && this.props.riderRegisterError}
          </div>
          <Field
            type="text"
            name="phoneNumber"
            label="Phone Number"
            component={PhoneNumber}
          />
          <Field
            required="*"
            type="text"
            name="IdNumber"
            label="ID No."
            component={AuthField}
          />
          <Field
            required="*"
            type="text"
            name="vehicleNo"
            label="Vehicle No."
            component={AuthField}
          />
          {/* <strong>* is required</strong> */}
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-md btn-block primary-button my-3"
            disabled={!this.props.valid || this.props.riderRegisterLoading}
            type="submit"
          >
            {this.props.riderRegisterLoading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {this.props.riderRegisterLoading ? (
              <span> {"  "}Loading...</span>
            ) : (
              <span>Add Driver</span>
            )}
          </button>
        </form>
      </div>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (
    !formValues.firstName ||
    (formValues.firstName && formValues.firstName.trim().length < 2)
  ) {
    errors.firstName = "Please enter a valid first name";
  }
  if (
    !formValues.lastName ||
    (formValues.lastName && formValues.lastName.trim().length < 2)
  ) {
    errors.lastName = "Please enter a valid last name";
  }
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email.trim()))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber)) ||
    (formValues.phoneNumber && formValues.phoneNumber.length !== 9)
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.IdNumber ||
    (formValues.IdNumber && !validator.isNumeric(formValues.IdNumber))
  ) {
    errors.IdNumber = "Please enter a valid ID number";
  }
  if (
    !formValues.vehicleNo ||
    (formValues.vehicleNo && !formValues.vehicleNo.trim().length === 0)
  ) {
    errors.vehicleNo = "Please enter a valid vehicle number";
  }
  return errors;
};
const mapStateToProps = state => {
  return {
    showEmailConfirm: state.auth.showEmailConfirm,
    riderRegisterLoading: state.riders.riderRegisterLoading,
    riderRegisterError: state.riders.riderRegisterError
  };
};
export default withRouter(
  reduxForm({ validate, form: "AdminAddDriver" })(
    connect(mapStateToProps, { riderRegister })(AdminAddDriver)
  )
);
