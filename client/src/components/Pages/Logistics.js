/*global google*/
import React from "react";
import FormField from "../Checkout/FormField";
import "./Logistics.css";
import { reduxForm, Field } from "redux-form";
import validator from "validator";
import { withRouter, Redirect } from "react-router-dom";
import AddressPhoneNumber from "../Account/AddressPhoneNumber";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { requestService } from "../../redux/actions";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import AutoComplete from "../Account/Autocomplete";
import SimpleMap from "../Account/SimpleMap";
import MobileLogo from "../Header/MobileLogo";

class Logistics extends React.Component {
  state = {
    cityLatLng: {},
    townLatLng: {},
    addressLatLng: {
      lat: -1.28585,
      lng: 36.8263
    },
    receiverCityLatLng: {},
    receiverAddressLatLng: {
      lat: -1.28585,
      lng: 36.8263
    },
    citySelected: false,
    townSelected: false,
    addressSelected: false
  };
  async componentDidUpdate() {
    if (!this.state.cityLatLng.lat || !this.state.townLatLng.lat) {
      if (this.props.user.city && !this.state.citySelected) {
        this.setState({ citySelected: true });
        const results = await geocodeByAddress(this.props.user.city);
        const latlng = await getLatLng(results[0]);
        this.setState({ cityLatLng: latlng });
      }
      if (this.props.user.town && !this.state.townSelected) {
        this.setState({ townSelected: true });
        const results = await geocodeByAddress(this.props.user.town);
        const latlng = await getLatLng(results[0]);
        this.setState({ townLatLng: latlng });
      }
      if (this.props.user.address && !this.state.addressSelected) {
        this.setState({ addressSelected: true });
        const results = await geocodeByAddress(this.props.user.address);
        const latlng = await getLatLng(results[0]);
        this.setState({ addressLatLng: latlng });
      }
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
  handleReceiverCitySelect = async selectedCity => {
    const results = await geocodeByAddress(selectedCity);
    const latlng = await getLatLng(results[0]);
    this.setState({ receiverCityLatLng: latlng });
    this.props.change("receiverCity", selectedCity);
  };

  handleReceiverAddressSelect = async selectedAddress => {
    const results = await geocodeByAddress(selectedAddress);
    const latlng = await getLatLng(results[0]);
    this.setState({ receiverAddressLatLng: latlng });
    this.props.change("receiverAddress", selectedAddress);
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/sign-in" />;
    }
    if (this.props.user && this.props.user.IdNumber) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container mt-4">
            <div className="row">
              <div
                className="col-md-9  mx-auto box-container"
                id="logistics-form"
              >
                <h3 className="legend text-center">Logistics</h3>
                <p className="my-2">
                  Our logistics personnel will collect your goods from your
                  current location to your desired location. Fill the form below
                  and click request service.{" "}
                  <b>Note: The service is operational only within Nairobi.</b>
                </p>
                <form
                  onSubmit={this.props.handleSubmit(async formValues => {
                    const origins = this.state.addressLatLng;
                    const destination = this.state.receiverAddressLatLng;
                    this.props.requestService(
                      {
                        ...formValues,
                        origins,
                        destination
                      },
                      this.props.history
                    );
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
                    label="Phone"
                    component={AddressPhoneNumber}
                  />
                  <Field
                    type="text"
                    name="itemName"
                    label="Item Name"
                    component={FormField}
                  />
                  <Field
                    type="number"
                    name="itemQuantity"
                    label="Item Quantity"
                    component={FormField}
                  />
                  <Field
                    type="text"
                    name="city"
                    label="From City"
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
                    name="address"
                    label="From Street Address"
                    className="address-location-input"
                    component={AutoComplete}
                    options={{
                      location: new google.maps.LatLng(this.state.cityLatLng),
                      radius: 1000,
                      types: ["establishment"]
                    }}
                    onSelect={this.handleToAddressSelect}
                  />

                  <Field
                    type="text"
                    name="receiverFullName"
                    label="Receiver Full Name"
                    component={FormField}
                  />
                  <Field
                    type="text"
                    name="receiverPhoneNumber"
                    label="Receiver Phone"
                    component={AddressPhoneNumber}
                  />
                  <Field
                    type="text"
                    name="receiverCity"
                    label="To City"
                    className="address-location-input"
                    component={AutoComplete}
                    options={{
                      componentRestrictions: { country: ["ke"] },
                      types: ["(cities)"]
                    }}
                    onSelect={this.handleReceiverCitySelect}
                  />

                  <Field
                    type="text"
                    name="receiverAddress"
                    label="To Street Address"
                    className="address-location-input"
                    component={AutoComplete}
                    options={{
                      location: new google.maps.LatLng(
                        this.state.receiverCityLatLng
                      ),
                      radius: 1000,
                      types: ["establishment"]
                    }}
                    onSelect={this.handleReceiverAddressSelect}
                  />
                  <SimpleMap
                    key={this.state.receiverAddressLatLng.lat}
                    addressLatLng={this.state.receiverAddressLatLng}
                    className="address-map"
                  />
                  <button
                    className="btn btn-md btn-block address-btn mt-3 "
                    disabled={
                      !this.props.valid ||
                      this.props.requestServiceLoading ||
                      Object.keys(this.state.townLatLng).length === 0 ||
                      Object.keys(this.state.cityLatLng).length === 0 ||
                      this.props.pristine
                    }
                    type="submit"
                  >
                    {this.props.requestServiceLoading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.props.requestServiceLoading ? (
                      <span> {"  "}Loading...</span>
                    ) : (
                      <span>Request Service</span>
                    )}
                  </button>
                  <div style={{ color: "red", margin: "10px 0px" }}>
                    {this.props.checkoutUserError &&
                      this.props.checkoutUserError}
                    {(!this.props.pristine &&
                      Object.keys(this.state.townLatLng).length === 0) ||
                      Object.keys(this.state.cityLatLng).length === 0 ||
                      (Object.keys(this.state.receiverCityLatLng).length ===
                        0 && (
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
    !formValues.receiverFullName ||
    (formValues.receiverFullName &&
      formValues.receiverFullName.trim().length < 2)
  ) {
    errors.receiverFullName = "Please enter a valid first name";
  }
  if (
    !formValues.lastName ||
    (formValues.lastName && formValues.lastName.trim().length < 2)
  ) {
    errors.lastName = "Please enter a valid last name";
  }
  if (
    !formValues.receiverLastName ||
    (formValues.receiverLastName &&
      formValues.receiverLastName.trim().length < 2)
  ) {
    errors.receiverLastName = "Please enter a valid last name";
  }
  if (
    !formValues.phoneNumber ||
    (formValues.phoneNumber && !validator.isNumeric(formValues.phoneNumber))
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.receiverPhoneNumber ||
    (formValues.receiverPhoneNumber &&
      !validator.isNumeric(formValues.receiverPhoneNumber))
  ) {
    errors.receiverPhoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.phoneNumber ||
    (formValues.phoneNumber && formValues.phoneNumber.length !== 9)
  ) {
    errors.phoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.receiverPhoneNumber ||
    (formValues.receiverPhoneNumber &&
      formValues.receiverPhoneNumber.length !== 9)
  ) {
    errors.receiverPhoneNumber = "Please enter a valid phone number";
  }
  if (
    !formValues.address ||
    (formValues.address && formValues.address.trim().length < 2)
  ) {
    errors.address = "Please enter a valid address";
  }
  if (
    !formValues.receiverAddress ||
    (formValues.receiverAddress && formValues.receiverAddress.trim().length < 2)
  ) {
    errors.receiverAddress = "Please enter a valid address";
  }
  if (!formValues.city || (formValues.city && formValues.city === "choose")) {
    errors.city = "Please enter a valid city";
  }
  if (!formValues.itemQuantity || formValues.itemQuantity < 1) {
    errors.itemQuantity = "Enter a valid item quantity";
  }
  if (
    !formValues.receiverCity ||
    (formValues.receiverCity && formValues.receiverCity === "choose")
  ) {
    errors.receiverCity = "Please enter a valid city";
  }

  return errors;
};
const mapStateToProps = state => {
  return {
    initialValues: state.auth.user,
    user: state.auth.user,
    requestServiceLoading: state.user.requestServiceLoading,
    customForm: state.form
  };
};
export default withRouter(
  connect(mapStateToProps, { requestService })(
    reduxForm({
      validate,
      form: "Logistics",
      destroyOnUnmount: false
    })(Logistics)
  )
);
