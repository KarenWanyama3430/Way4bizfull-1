import React from "react";

import "./RegisterForm.css";
import { reduxForm, Field } from "redux-form";
import AuthField from "./AuthField";
import validator from "validator";
import { register } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PhoneNumber from "../Account/PhoneNumber";
import EmailConfirm from "./EmailConfirm";

class RegisterForm extends React.Component {
  render() {
    if (this.props.showEmailConfirm) return <EmailConfirm />;
    return (
      <div>
        <form
          onSubmit={this.props.handleSubmit(formValues => {
            this.props.register(formValues);
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
            {this.props.registerError && this.props.registerError}
          </div>
          <Field
            type="text"
            name="phoneNumber"
            label="Phone Number"
            component={PhoneNumber}
          />
          <Field
            required="*"
            type="password"
            name="password"
            label="Password"
            component={AuthField}
          />
          <Field
            required="*"
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            component={AuthField}
          />
          {/* <strong>* is required</strong> */}
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-md btn-block primary-button mt-3"
            disabled={!this.props.valid || this.props.registerLoading}
            type="submit"
          >
            {this.props.registerLoading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {this.props.registerLoading ? (
              <span> {"  "}Loading...</span>
            ) : (
              <span>Register</span>
            )}
          </button>
        </form>
        <br />
        <a
          href="/auth/google"
          className="btn btn-md btn-block mt-3 secondary-google"
          type="submit"
        >
          Sign In With Google
        </a>
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
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Your password must be atleast six characters";
  }
  if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
const mapStateToProps = state => {
  return {
    showEmailConfirm: state.auth.showEmailConfirm,
    registerLoading: state.auth.registerLoading,
    registerError: state.auth.registerError
  };
};
export default withRouter(
  reduxForm({ validate, form: "RegisterForm" })(
    connect(mapStateToProps, { register })(RegisterForm)
  )
);
