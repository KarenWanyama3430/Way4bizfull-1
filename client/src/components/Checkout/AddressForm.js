/*global google*/
import React from "react";
import FormField from "./FormField";
import "./AddressForm.css";
import { reduxForm, Field } from "redux-form";
import validator from "validator";
import { withRouter, Redirect } from "react-router-dom";
import AddressPhoneNumber from "../Account/AddressPhoneNumber";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Header from "../Header/Header";
import { connect } from "react-redux";
import {
  checkoutUser,
  proceedToCheckout,
  storeLatLng
} from "../../redux/actions";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AutoComplete from "../Account/Autocomplete";
import SimpleMap from "../Account/SimpleMap";
import MobileLogo from "../Header/MobileLogo";

class AddressForm extends React.Component {
  state = {
    cityLatLng: {},
    townLatLng: {},
    addressLatLng: {
      lat: -1.28585,
      lng: 36.8263
    }
  };
  componentDidMount() {
    this.props.proceedToCheckout(this.props.history, "/address");
    if (this.props.initialValues.city) {
      const { city } = this.props.initialValues;
      this.handleCitySelect(city);
    }
    if (this.props.initialValues.town) {
      const { town } = this.props.initialValues;
      this.handleTownSelect(town);
    }
    if (this.props.initialValues.address) {
      const { address } = this.props.initialValues;
      this.handleAddressSelect(address);
    }
  }
  handleCitySelect = async selectedCity => {
    const results = await geocodeByAddress(selectedCity);
    const latlng = await getLatLng(results[0]);
    this.setState({ cityLatLng: latlng });
    this.props.change("city", selectedCity);
  };
  handleTownSelect = async selectedTown => {
    const results = await geocodeByAddress(selectedTown);
    const latlng = await getLatLng(results[0]);
    this.setState({ townLatLng: latlng });
    this.props.change("town", selectedTown);
  };
  handleAddressSelect = async selectedAddress => {
    const results = await geocodeByAddress(selectedAddress);
    const latlng = await getLatLng(results[0]);
    this.setState({ addressLatLng: latlng });
    this.props.change("address", selectedAddress);
  };
  render() {
    if (this.props.cart.length === 0) return <Redirect to="/" />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container mt-4">
            <div className="row">
              <div
                className="col-md-9  mx-auto box-container"
                id="address-form"
              >
                <h3 className="legend">Address Details</h3>
                {/* <hr /> */}
                <form
                  onSubmit={this.props.handleSubmit(formValues => {
                    this.props.storeLatLng(
                      `${this.state.addressLatLng.lat.toString()},${this.state.addressLatLng.lng.toString()}`
                    );
                    this.props.checkoutUser(formValues, this.props.history);
                  })}
                >
                  <Field
                    type="text"
                    name="firstName"
                    label="First Name"
                    component={FormField}
                  />
                  <Field
                    type="text"
                    name="lastName"
                    label="Last Name"
                    component={FormField}
                  />
                  <Field
                    type="text"
                    name="phoneNumber"
                    label="Phone Number"
                    component={AddressPhoneNumber}
                  />
                  <Field
                    type="text"
                    name="city"
                    label="City"
                    className="address-location-input"
                    component={AutoComplete}
                    options={{
                      componentRestrictions: { country: ["ke"] },
                      types: ["(cities)"]
                    }}
                    onSelect={this.handleCitySelect}
                  />
                  <Field
                    type="text"
                    name="town"
                    label="Town"
                    className="address-location-input"
                    component={AutoComplete}
                    options={{
                      componentRestrictions: { country: ["ke"] },
                      types: ["(cities)"]
                    }}
                    onSelect={this.handleTownSelect}
                  />
                  <Field
                    type="text"
                    name="address"
                    label="Street Address"
                    className="address-location-input"
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
                    className="address-map"
                  />
                  <button
                    className="btn btn-md btn-block address-btn mt-3 "
                    disabled={
                      !this.props.valid ||
                      this.props.checkoutUserLoading ||
                      Object.keys(this.state.townLatLng).length === 0 ||
                      Object.keys(this.state.cityLatLng).length === 0
                    }
                    type="submit"
                  >
                    {this.props.checkoutUserLoading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.props.checkoutUserLoading ? (
                      <span> {"  "}Loading...</span>
                    ) : (
                      <span>Proceed To Checkout</span>
                    )}
                  </button>
                  <div style={{ color: "red", margin: "10px 0px" }}>
                    {this.props.checkoutUserError &&
                      this.props.checkoutUserError}
                    {(!this.props.pristine &&
                      Object.keys(this.state.townLatLng).length === 0) ||
                      (Object.keys(this.state.cityLatLng).length === 0 && (
                        <p>
                          Please choose a valid destination or wait for the map
                          to load if you have already chosen.
                        </p>
                      ))}
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
    !formValues.phoneNumber ||
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber))
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.phoneNumber ||
    (formValues.phoneNumber && formValues.phoneNumber.length !== 9)
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.address ||
    (formValues.address && formValues.address.trim().length < 2)
  ) {
    errors.address = "Please enter a valid address";
  }
  if (!formValues.city || (formValues.city && formValues.city === "choose")) {
    errors.city = "Please choose a city";
  }
  if (!formValues.town || (formValues.town && formValues.town === "choose")) {
    errors.town = "Please choose a town";
  }
  return errors;
};
const mapStateToProps = state => {
  return {
    initialValues: state.auth.user,
    checkoutUserLoading: state.auth.checkoutUserLoading,
    checkoutUserError: state.auth.checkoutUserError,
    cart: state.cartReducer.cart
  };
};
export default withRouter(
  connect(mapStateToProps, { checkoutUser, storeLatLng, proceedToCheckout })(
    reduxForm({ validate, form: "AddressForm" })(AddressForm)
  )
);
