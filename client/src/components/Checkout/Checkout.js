import React from "react";

import "./Checkout.css";
import EditAddressSection from "./EditAddress";
import PaymentMethods from "./PaymentMethods";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Header from "../Header/Header";
import { withRouter, Redirect } from "react-router-dom";
import { reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
  fetchProducts,
  preMakeOrder,
  proceedToCheckout,
  removeAddress,
  selfCollectionAddress
} from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";
import GoodsReach from "./GoodsReach";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

class CheckOut extends React.Component {
  componentDidMount() {
    if (this.props.cart.length === 0) {
      return <Redirect to="/" />;
    }
    this.props.proceedToCheckout(this.props.history, "/checkout");
  }
  componentWillUnmount() {
    this.props.removeAddress();
  }
  handleSelect = async selectedCity => {
    const results = await geocodeByAddress(selectedCity);
    const latlng = await getLatLng(results[0]);
    this.props.selfCollectionAddress(latlng);
  };
  render() {
    if (this.props.cart.length === 0) {
      this.props.fetchProducts();
      return <Redirect to="/" />;
    }
    if (!this.props.latLng) return <Redirect to="/address" />;
    const { user, cart } = this.props;
    const total = this.props.cart
      .map(item => item.price * item.quantity)
      .reduce((acc, curr) => acc + curr, 0)
      .toLocaleString();
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <form
            onSubmit={this.props.handleSubmit(formValues => {
              if (formValues["goods-reach"] === "self-collection") {
                formValues.delivery = "Self-Collection";
              }
              this.props.preMakeOrder({ formValues, cart }, this.props.history);
            })}
            className="mt-4"
          >
            <div className="container  main-checkout-wrapper">
              <div className="row">
                <div className="col-md-8 mx-auto">
                  <div id="address-details" className="mb-3 box-container">
                    <h4>Address Details</h4>
                    <hr />
                    <div id="current-address">
                      <h6>
                        {user.firstName} {user.lastName}
                      </h6>
                      <p>
                        {user.address} / {user.town} / {user.city}
                      </p>
                      <p> +254{user.phoneNumber}</p>
                    </div>
                    <EditAddressSection />
                    <br />
                  </div>
                  <div id="delivery-details" className="mb-3 box-container">
                    <h4>How should the goods reach you?</h4>
                    <hr />
                    <GoodsReach />
                    {/* <DeliveryMethods /> */}
                  </div>
                  <div id="payment-methods" className="box-container">
                    <h4>Payment Methods</h4>
                    <hr />
                    <p className="ml-3">
                      How do you want to pay for your order?
                    </p>
                    <PaymentMethods />
                    <div className="checkout-sub-total">
                      <div>
                        <p>Total</p>
                        <p>{total}</p>
                      </div>
                      <div>
                        <p>Shipping</p>
                        <p>
                          {this.props.distance
                            ? Math.round(
                                this.props.distance
                                  ? this.props.distance.shippingFees
                                  : 0
                              ).toLocaleString()
                            : "N/A"}
                        </p>
                      </div>
                      <hr />
                      <div>
                        <p>Total</p>
                        <p>
                          {(parseInt(total.replace(",", "")) +
                          this.props.distance
                            ? Math.round(
                                this.props.distance
                                  ? this.props.distance.shippingFees +
                                      parseInt(total.replace(",", ""))
                                  : parseInt(total.replace(",", ""))
                              )
                            : 0
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <button
                          // check which payment method is choosen and do the routing
                          className="btn btn-md order-btn"
                          disabled={
                            !this.props.valid ||
                            this.props.checkoutUserLoading ||
                            this.props.pristine ||
                            !this.props.payment ||
                            (!this.props.delivery &&
                              this.props.goodsReach &&
                              this.props.goodsReach !== "self-collection") ||
                            (this.props.goodsReach &&
                              this.props.goodsReach === "self-collection" &&
                              Object.keys(this.props.address).length === 0)
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
                            <span>Order Now</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const validate = formValues => {
  const errors = {};
  if (!formValues.payment) {
    errors.payment = "Please choose a valid payment method";
  }
  if (!formValues.delivery && formValues["goods-reach"] !== "self-collection") {
    errors.delivery = "Please choose a valid delivery method";
  }
  return errors;
};
const selector = formValueSelector("Checkout");
const mapStateToProps = state => {
  const payment = selector(state, "payment");
  const delivery = selector(state, "delivery");
  const goodsReach = selector(state, "goods-reach");
  return {
    user: state.auth.user,
    cart: state.cartReducer.cart,
    checkoutUserLoading: state.auth.checkoutUserLoading,
    distance: state.detailsPersist.distance,
    latLng: state.detailsPersist.latLng,
    address: state.selfCollection.address,
    selfCollectionLoading: state.selfCollection.selfCollectionLoading,
    payment,
    delivery,
    goodsReach
  };
};
export default withRouter(
  reduxForm({ form: "Checkout", validate })(
    connect(mapStateToProps, {
      preMakeOrder,
      fetchProducts,
      removeAddress,
      selfCollectionAddress,
      proceedToCheckout
    })(CheckOut)
  )
);
