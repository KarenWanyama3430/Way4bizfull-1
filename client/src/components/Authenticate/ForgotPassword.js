import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { passwordReset } from "../../redux/actions";
import validator from "validator";
import AuthField from "./AuthField";
import "../Account/Account.css";

import AuthHeader from "./AuthHeader";
import MobileLogo from "../Header/MobileLogo";

export class ForgotPassword extends Component {
  render() {
    return (
      <div>
        <MobileLogo />
        <AuthHeader />
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-5 mx-auto">
              {this.props.success ? (
                <h3>{this.props.success}</h3>
              ) : (
                <React.Fragment>
                  <h3 className="mb-3">Reset your password</h3>

                  <form
                    onSubmit={this.props.handleSubmit((formValues) =>
                      this.props.passwordReset(formValues)
                    )}
                  >
                    <p className="mb-3">
                      To reset your password, enter the email address you use to
                      sign in.
                    </p>
                    <Field
                      type="text"
                      name="email"
                      label="Email"
                      component={AuthField}
                    />
                    <div style={{ color: "red", width: "400px" }}>
                      {this.props.resetPasswordError &&
                        this.props.resetPasswordError}
                    </div>
                    <button
                      style={{ cursor: "pointer" }}
                      className="btn btn-md btn-block primary-button mt-3"
                      disabled={!this.props.valid || this.props.loading}
                      type="submit"
                    >
                      {this.props.loading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {this.props.loading ? (
                        <span> {"  "}Loading...</span>
                      ) : (
                        <span>Get Reset Link</span>
                      )}
                    </button>
                  </form>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.email ||
    (formValues.email && !validator.isEmail(formValues.email.trim()))
  ) {
    errors.email = "Please enter a valid email";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    resetPasswordError: state.auth.resetPasswordError,
    success: state.auth.success,
  };
};
export default reduxForm({ validate, form: "ForgotPassword" })(
  connect(mapStateToProps, { passwordReset })(ForgotPassword)
);
