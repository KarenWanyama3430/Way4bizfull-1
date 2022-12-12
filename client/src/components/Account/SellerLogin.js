import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import AuthField from "../Authenticate/AuthField";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { sellerLogIn } from "../../redux/actions";
import validator from "validator";
import AuthHeader from "../Authenticate/AuthHeader";
import MobileLogo from "../Header/MobileLogo";

export class SellerLogin extends Component {
  render() {
    return (
      <div>
        <MobileLogo />
        <AuthHeader />
        <br />
        <h2 style={{ textAlign: "center" }}>Sign In</h2>
        <br />
        <div className="form-primary-error">
          {this.props.error && this.props.error}
        </div>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit((formValues) => {
            return this.props.sellerLogIn(formValues, this.props.history);
          })}
        >
          <Field type="text" name="email" label="Email" component={AuthField} />
          <Field
            type="password"
            name="password"
            label="Password"
            component={AuthField}
          />
          <button
            className="btn btn-md btn-block auth-btn mt-3 primary-button"
            disabled={!this.props.valid || this.props.sellerLoginLoading}
            type="submit"
          >
            {this.props.sellerLoginLoading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {this.props.sellerLoginLoading ? (
              <span> {"  "}Loading...</span>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
        <br />
        <div className="seller-login-auth-links-wrapper mx-auto">
          <p className="forgot-password-link-wrapper">
            <Link style={{ color: "#f76b1a" }} to="/password/reset">
              Forgot password?
            </Link>
          </p>
          <p className="forgot-password-link-wrapper">
            <Link
              style={{ color: "#f76b1a" }}
              className="float-right"
              to="/seller/register"
            >
              Register Today
            </Link>
          </p>
        </div>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.email ||
    (formValues.email.trim() && !validator.isEmail(formValues.email.trim()))
  ) {
    errors.email = "Please enter a valid email";
  }
  if (
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password =
      "Please enter a password with a minimum of six characters";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    sellerLoginLoading: state.auth.sellerLoginLoading,
  };
};
export default withRouter(
  reduxForm({ validate, form: "SellerLogin" })(
    connect(mapStateToProps, { sellerLogIn })(SellerLogin)
  )
);
