import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import AuthField from "./AuthField";
import AuthHeader from "./AuthHeader";
import { resetTokenCheck, forgotPassword } from "../../redux/actions";
import { Redirect, withRouter } from "react-router-dom";
import MobileLogo from "../Header/MobileLogo";

export class ResetPassword extends Component {
  componentDidMount() {
    // CHECK FOR RESET TOKEN
    this.props.resetTokenCheck();
  }
  render() {
    if (
      this.props.resetToken &&
      Object.keys(this.props.resetToken).length === 0
    ) {
      return <Redirect to="/password/reset" />;
    }
    return (
      <div>
        <MobileLogo />
        <AuthHeader />
        <br />
        <br />
        <form
          onSubmit={this.props.handleSubmit((formValues) =>
            this.props.forgotPassword(formValues, this.props.history)
          )}
        >
          <Field
            type="password"
            name="password"
            label="Password"
            component={AuthField}
          />
          <Field
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            component={AuthField}
          />
          <div style={{ color: "red", width: "400px" }}>
            {this.props.error && this.props.error}
          </div>
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-md btn-block primary-button mt-3"
            disabled={
              !this.props.valid || this.props.loading || this.props.pristine
            }
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
              <span>Reset Password</span>
            )}
          </button>
        </form>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.email = "Please enter a valid password";
  }
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    resetToken: state.seller.resetToken,
  };
};

export default withRouter(
  reduxForm({ validate, form: "ResetPassword" })(
    connect(mapStateToProps, { resetTokenCheck, forgotPassword })(ResetPassword)
  )
);
