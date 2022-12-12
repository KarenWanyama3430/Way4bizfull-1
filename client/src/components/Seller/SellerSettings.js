import React from "react";

import "./SellerSettings.css";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import { reduxForm, Field } from "redux-form";
import SellerInput from "./SellerInput";
import SellerTextArea from "./SellerTextArea";
import validator from "validator";
import { connect } from "react-redux";
import { updateSeller, fetchCurrentSeller } from "../../redux/actions";
import { withRouter, Redirect } from "react-router-dom";
import ScreenLoader from "../Pages/ScreenLoader";

class SellerSettings extends React.Component {
  componentDidMount() {
    this.props.fetchCurrentSeller();
  }

  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (this.props.fetchSellerLoading) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="dashboard-content col-lg-9 mx-auto py-3">
            <div className="box-container">
              <div className="container">
                <form
                  className="form-group store-settings-form"
                  onSubmit={this.props.handleSubmit((formValues) =>
                    this.props.updateSeller(formValues, this.props.history)
                  )}
                >
                  <h3
                    style={{ textAlign: "center", textDecoration: "underline" }}
                  >
                    Personal Details
                  </h3>
                  <Field
                    label="First Name"
                    name="firstName"
                    htmlFor="firstName"
                    component={SellerInput}
                    type="text"
                    placeholder="First Name"
                  />
                  <Field
                    label="Last Name"
                    name="lastName"
                    htmlFor="lastName"
                    component={SellerInput}
                    type="text"
                    placeholder="Last Name"
                  />
                  <Field
                    readOnly={true}
                    label="Phone"
                    name="phoneNumber"
                    htmlFor="phoneNumber"
                    component={SellerInput}
                    type="number"
                    placeholder="712345678"
                  />
                  <Field
                    readOnly={true}
                    label="Email"
                    name="email"
                    htmlFor="email"
                    component={SellerInput}
                    type="text"
                    placeholder="test@test.com"
                  />
                  <h3
                    style={{ textAlign: "center", textDecoration: "underline" }}
                  >
                    Store Details
                  </h3>
                  <Field
                    label="Store Name"
                    name="storeName"
                    htmlFor="storeName"
                    component={SellerInput}
                    type="text"
                    placeholder="Store Name"
                  />
                  <Field
                    label="Seller Description"
                    name="description"
                    htmlFor="description"
                    component={SellerTextArea}
                    type="text"
                    placeholder="Seller Description"
                  />
                  <button
                    type="submit"
                    disabled={
                      !this.props.valid ||
                      this.props.loading ||
                      this.props.pristine
                    }
                    className="btn store-settings-btn"
                  >
                    {" "}
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
                      <span>Update</span>
                    )}
                  </button>
                </form>
              </div>
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
  if (!formValues.phoneNumber) {
    errors.phoneNumber = "Please enter a phone number";
  }
  if (
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber)) ||
    (formValues.phoneNumber && formValues.phoneNumber.length !== 9)
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.description ||
    (formValues.description && formValues.description.trim().length < 20)
  ) {
    errors.description =
      "Please enter a description with a minimum of 20 characters";
  }
  if (
    !formValues.storeName ||
    (formValues.storeName && formValues.storeName.trim().length < 3)
  ) {
    errors.storeName =
      "Please enter a valid store name with 3 characters minimum ";
  }

  return errors;
};
const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
    loading: state.auth.loading,
    user: state.auth.user,
    fetchSellerLoading: state.seller.fetchSellerLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { updateSeller, fetchCurrentSeller })(
    reduxForm({ validate, form: "SellerSettings", enableReinitialize: true })(
      SellerSettings
    )
  )
);
