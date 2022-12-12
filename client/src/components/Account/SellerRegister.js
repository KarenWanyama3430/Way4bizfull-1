/*global google*/
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import AuthField from "../Authenticate/AuthField";
import PhoneNumber from "./PhoneNumber";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import validator from "validator";
import SellerTextArea from "./SellerTextArea";
import EmailConfirm from "../Authenticate/EmailConfirm";
import { registerSeller, checkReferral } from "../../redux/actions";
import AuthHeader from "../Authenticate/AuthHeader";
import AutoComplete from "./Autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SimpleMap from "./SimpleMap";
import MobileLogo from "../Header/MobileLogo";
import "./SellerRegister.css";

export class SellerRegister extends Component {
  state = {
    cityLatLng: {},
    addressLatLng: {
      lat: -1.28585,
      lng: 36.8263
    }
  };

  componentDidMount() {
    if (Object.keys(this.props.match.params).length !== 0) {
      this.props.checkReferral(
        this.props.match.params.referralCode,
        this.props.history
      );
    }
  }
  handleCitySelect = async selectedCity => {
    const results = await geocodeByAddress(selectedCity);
    const latlng = await getLatLng(results[0]);
    this.setState({ cityLatLng: latlng });
    this.props.change("city", selectedCity);
  };
  handleAddressSelect = async selectedAddress => {
    const results = await geocodeByAddress(selectedAddress);
    const latlng = await getLatLng(results[0]);
    this.setState({ addressLatLng: latlng });
    this.props.change("address", selectedAddress);
  };
  render() {
    if (this.props.showEmailConfirm) {
      return (
        <React.Fragment>
          <AuthHeader />
          <EmailConfirm />
        </React.Fragment>
      );
    }
    return (
      <div>
        <MobileLogo />
        <AuthHeader />
        <h1 style={{ textAlign: "center" }} className="my-2">
          Register
        </h1>

        <p className="form-input" style={{ color: "red" }}>
          We are currently accepting sellers from within Nairobi ONLY.
        </p>

        <form
          onSubmit={this.props.handleSubmit(formValues => {
            const { registerSeller } = this.props;
            registerSeller({
              ...formValues,
              ...(this.props.match.params.referralCode && {
                referralCode: this.props.match.params.referralCode
              })
            });
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

          <Field
            required="*"
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
          <Field
            required="*"
            type="text"
            name="storeName"
            label="Store Name"
            component={AuthField}
          />
          <Field
            required="*"
            type="text"
            name="description"
            label="Description"
            component={SellerTextArea}
          />
          <Field
            required="*"
            type="text"
            name="businessNumber"
            label="Business Number"
            component={AuthField}
          />
          <Field
            required="*"
            type="text"
            name="city"
            label="City"
            className="location-input"
            component={AutoComplete}
            options={{
              componentRestrictions: { country: ["ke"] },
              types: ["(cities)"]
            }}
            onSelect={this.handleCitySelect}
          />
          <Field
            required="*"
            type="text"
            name="address"
            label="Street Address"
            className="location-input"
            component={AutoComplete}
            options={{
              location: new google.maps.LatLng(this.state.cityLatLng),
              radius: 1000,
              types: ["establishment"]
            }}
            onSelect={this.handleAddressSelect}
          />
          <SimpleMap
            key={this.state.addressLatLng.lat}
            addressLatLng={this.state.addressLatLng}
            className="map"
          />
          <button
            style={{ cursor: "pointer" }}
            className="btn btn-md btn-block primary-button mt-3"
            disabled={!this.props.valid || this.props.sellerRegisterLoading}
            type="submit"
          >
            {this.props.sellerRegisterLoading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {this.props.sellerRegisterLoading ? (
              <span> {"  "}Loading...</span>
            ) : (
              <span>Register</span>
            )}
          </button>
          <div className="form-primary-error">
            {this.props.sellerRegisterError && this.props.sellerRegisterError}
          </div>
        </form>
        <p className="my-2" id="seller-register-sign-in">
          Already have an account?{" "}
          <Link to="/seller/sign-in" id="seller-register-sign-in-link">
            Sign in
          </Link>
        </p>
        <br />
        <br />
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
    !formValues.password ||
    (formValues.password && formValues.password.trim().length < 6)
  ) {
    errors.password = "Your password must be atleast six characters";
  }
  if (formValues.confirmPassword !== formValues.password) {
    errors.confirmPassword = "Passwords do not match";
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
      "Please enter a valid store name with 3 characters minimum";
  }
  if (
    !formValues.city ||
    (formValues.city && formValues.city.trim().length === 0)
  ) {
    errors.city = "Please enter a valid city";
  }
  if (
    !formValues.address ||
    (formValues.address && formValues.address.trim().length === 0)
  ) {
    errors.address = "Please enter a valid address";
  }
  if (!formValues.businessNumber) {
    errors.businessNumber = "Please enter a valid business number";
  }
  return errors;
};
const mapStateToProps = state => {
  return {
    sellerRegisterLoading: state.seller.sellerRegisterLoading,
    showEmailConfirm: state.auth.showEmailConfirm,
    sellerRegisterError: state.seller.sellerRegisterError
  };
};
export default withRouter(
  reduxForm({
    validate,
    form: "SellerRegister"
  })(
    connect(mapStateToProps, { registerSeller, checkReferral })(SellerRegister)
  )
);
