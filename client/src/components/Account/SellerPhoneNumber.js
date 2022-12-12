import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import PhoneNumber from "./PhoneNumber";
import { connect } from "react-redux";
import validator from "validator";
import AuthHeader from "../Authenticate/AuthHeader";
import { fetchSeller, sendMessage } from "../../redux/actions";
import { Redirect, withRouter } from "react-router-dom";

export class SellerPhoneNumber extends Component {
  componentDidMount() {
    this.props.fetchSeller();
  }
  render() {
    if (this.props.initialValues) {
      if (Object.keys(this.props.initialValues).length > 0) {
        return (
          <div>
            <AuthHeader />
            <br />
            <br />
            <br />
            <br />
            <form
              onSubmit={this.props.handleSubmit(formValues =>
                this.props.sendMessage(formValues, this.props.history)
              )}
            >
              <Field
                type="text"
                name="phoneNumber"
                label="Phone Number"
                component={PhoneNumber}
              />
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
                  <span>Send SMS</span>
                )}
              </button>
            </form>
          </div>
        );
      }
      return <Redirect to="/seller/register" />;
    } else {
      return null;
    }
  }
}
const validate = formValues => {
  const errors = {};
  if (
    !formValues.phoneNumber ||
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber))
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (formValues.phoneNumber && formValues.phoneNumber.length !== 9) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  return errors;
};
const mapStateToProps = state => {
  let initialValues;
  if (state.seller.seller && Object.keys(state.seller.seller)) {
    initialValues = state.seller.seller;
  }
  return {
    loading: state.auth.loading,
    initialValues
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchSeller, sendMessage })(
    reduxForm({ validate, form: " SellerPhoneNumber" })(SellerPhoneNumber)
  )
);
