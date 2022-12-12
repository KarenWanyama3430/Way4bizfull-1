import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import FormField from "../Checkout/FormField";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import MobileLogo from "../Header/MobileLogo";
import { riderChangePassword } from "../../redux/actions";

export class RiderChangePassword extends Component {
  render() {
    if (!this.props.user || (this.props.user && !this.props.user.IdNumber)) {
      return <Redirect to="/driver/sign-in" />;
    }
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container">
            <div className="row">
              <div
                className="col-md-9 my-5 mx-auto box-container"
                id="address-form"
              >
                <h3 className="legend">Change Password</h3>
                {/* <hr /> */}
                <form
                  onSubmit={this.props.handleSubmit(formValues => {
                    this.props.riderChangePassword(
                      formValues,
                      this.props.history
                    );
                  })}
                >
                  <Field
                    type="password"
                    name="currentPassword"
                    label="Current Password"
                    component={FormField}
                  />
                  <Field
                    type="password"
                    name="newPassword"
                    label="New Password"
                    component={FormField}
                  />
                  <Field
                    type="password"
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    component={FormField}
                  />
                  <button
                    className="btn btn-md btn-block address-btn mt-3 "
                    type="submit"
                    disabled={
                      this.props.invalid ||
                      this.props.riderChangePasswordLoading
                    }
                  >
                    {this.props.riderChangePasswordLoading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.props.riderChangePasswordLoading ? (
                      <span> {"  "}Loading...</span>
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                  <div style={{ color: "red", margin: "10px 0px" }}>
                    {this.props.riderChangePasswordError}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (
    !formValues.currentPassword ||
    (formValues.currentPassword && formValues.currentPassword.length < 6)
  ) {
    errors.currentPassword = "Please enter a valid password";
  }
  if (
    !formValues.newPassword ||
    (formValues.newPassword && formValues.newPassword.length < 6)
  ) {
    errors.newPassword = "Your password must be atleast six characters";
  }
  if (formValues.confirmNewPassword !== formValues.newPassword) {
    errors.confirmNewPassword = "Passwords do not patch";
  }
  return errors;
};
const mapStateToProps = state => {
  return {
    riderChangePasswordLoading: state.riders.riderChangePasswordLoading,
    riderChangePasswordError: state.riders.riderChangePasswordError,
    user: state.auth.user
  };
};
export default withRouter(
  reduxForm({ validate, form: "RiderChangePassword" })(
    connect(mapStateToProps, { riderChangePassword })(RiderChangePassword)
  )
);
