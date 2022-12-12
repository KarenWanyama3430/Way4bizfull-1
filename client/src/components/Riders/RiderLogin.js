import React from "react";
import "./RiderLogin.css";
import { reduxForm, Field } from "redux-form";
import AuthField from "../Authenticate/AuthField";
import validator from "validator";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import MobileLogo from "../Header/MobileLogo";
import AuthHeader from "../Authenticate/AuthHeader";
import { riderLogIn } from "../../redux/actions";

class RiderLogin extends React.Component {
  render() {
    return (
      <div>
        <MobileLogo />
        <AuthHeader />
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(formValues => {
            window.navigator.geolocation.getCurrentPosition(pos => {
              this.props.riderLogIn(
                {
                  ...formValues,
                  location: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                  }
                },
                this.props.history
              );
            });
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
            disabled={!this.props.valid || this.props.riderLoginLoading}
            type="submit"
          >
            {this.props.riderLoginLoading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {this.props.riderLoginLoading ? (
              <span> {"  "}Loading...</span>
            ) : (
              <span>Login</span>
            )}
          </button>
          <div className="form-primary-error">
            {this.props.riderLoginError && this.props.riderLoginError}
          </div>
        </form>
        <br />
        <div className="login-auth-links-wrapper">
          <p className="forgot-password-link-wrapper">
            <Link style={{ color: "#f76b1a" }} to="/password/reset">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const validate = formValues => {
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
const mapStateToProps = state => {
  return {
    riderLoginError: state.riders.riderLoginError,
    riderLoginLoading: state.riders.riderLoginLoading
  };
};
export default withRouter(
  reduxForm({ validate, destroyOnUnmount: false, form: "RiderLogin" })(
    connect(mapStateToProps, { riderLogIn })(RiderLogin)
  )
);
