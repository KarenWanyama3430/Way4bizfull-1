import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { connect } from "react-redux";
import "./LogisticsPayment.css";
import MobileLogo from "../Header/MobileLogo";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  confirmLogisticsDelivery,
  emptyFetchedDelivery,
  fetchDelivery
} from "../../redux/actions";
import ScreenLoader from "./ScreenLoader";
import NotFound from "./NotFound";
import { BsCheckCircle } from "react-icons/bs";

class LogisticsPayment extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchDelivery(
      this.props.match.params.deliveryId,
      this.props.history
    );
  }
  componentWillUnmount() {
    this.props.emptyFetchedDelivery();
  }
  render() {
    if (!this.props.fetchedDelivery) {
      return <ScreenLoader />;
    }
    if (this.props.fetchedDelivery === "") {
      return <NotFound />;
    }
    let user;
    if (this.props.fetchedDelivery.user) {
      user = this.props.fetchedDelivery.user;
    }
    if (this.props.fetchedDelivery.userSeller) {
      user = this.props.fetchedDelivery.userSeller;
    }
    if (
      !this.props.user ||
      (this.props.user && this.props.user._id !== user._id)
    ) {
      return <Redirect to="/" />;
    }
    const { firstName, lastName, phoneNumber, address } = user;
    const {
      receiverFullName,
      itemName,
      itemQuantity,
      receiverPhoneNumber,
      receiverAddress,
      confirmed,
      _id
    } = this.props.fetchedDelivery;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container-fluid white-body logistics-payment-wrapper">
            {/* show this before payment */}
            {!confirmed && (
              <div className="col-md-7 col-lg-5 mx-auto text-left pt-5">
                <h4 className="mb-3">You are almost done!</h4>
                <p className="mb-1">
                  The service will cost you ksh.{" "}
                  {Math.round(
                    this.props.fetchedDelivery.charge
                  ).toLocaleString()}
                  . You will be required to give the payment to the delivery guy
                  together with the item to deliver.
                </p>

                <div className="ml-3 text-left logisitics-confirm-details">
                  <h5>Details</h5>
                  <p>
                    <b>Sender: </b>
                    {firstName} {lastName}
                  </p>
                  <p>
                    <b>Phone: </b>0{phoneNumber}
                  </p>
                  <p>
                    <b>Item Name: </b>
                    {itemName}
                  </p>
                  <p>
                    <b>Item Qty: </b>
                    {itemQuantity}
                  </p>
                  <p>
                    <b>From: </b>
                    {address}
                  </p>
                  <p>
                    <b>To: </b>
                    {receiverAddress}
                  </p>
                  <p>
                    <b>Recipient: </b>
                    {receiverFullName}
                  </p>
                  <p>
                    <b>Phone: </b>0{receiverPhoneNumber}
                  </p>

                  <Link to="/logistics">Edit</Link>
                </div>

                <p className="mt-1">
                  Please confirm payment and we will have someone come pick your
                  item for delivery.
                </p>
                <button
                  onClick={() => {
                    this.props.confirmLogisticsDelivery(
                      this.props.match.params.deliveryId
                    );
                  }}
                  className="btn btn-md my-3 secondary-button logistics-confirm-payment"
                  disabled={
                    this.props.fetchedDelivery.confirmed ||
                    this.props.logisticsLoading
                  }
                >
                  {this.props.logisticsLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {this.props.logisticsLoading ? (
                    <span> {"  "}Loading...</span>
                  ) : (
                    <span>Confirm Payment</span>
                  )}
                </button>
              </div>
            )}
            {/* show this after payment */}
            {this.props.fetchedDelivery.confirmed && (
              <div className="col-md-7 col-lg-5 mx-auto text-center pt-5">
                <div className="d-flex align-items-center justify-content-center">
                  <BsCheckCircle
                    style={{ fontSize: "100px", color: "#4BB543" }}
                  />
                </div>
                <h4 className="mb-3">The driver is on the way!</h4>
                <div className="ml-2 logistics-driver-details">
                  <h5>Driver Details</h5>
                  <p>
                    <b>Driver Phone: </b>0
                    {this.props.fetchedDelivery.driver.phoneNumber}
                  </p>
                  <p>
                    <b>Vehicle No.: </b>
                    {this.props.fetchedDelivery.driver.vehicleNo}
                  </p>
                </div>
                <p>
                  You will be notified when he arrives. View your delivery
                  details{" "}
                  <Link
                    to={`/logistic/${_id}`}
                    style={{ color: "#f76b1a", textDecoration: "none" }}
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    fetchedDelivery: state.user.fetchedDelivery,
    driver: state.user.driver,
    logisticsLoading: state.user.logisticsLoading
  };
};
export default withRouter(
  connect(mapStateToProps, {
    fetchDelivery,
    confirmLogisticsDelivery,
    emptyFetchedDelivery
  })(LogisticsPayment)
);
