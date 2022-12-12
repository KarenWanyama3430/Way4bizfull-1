import React from "react";
import "./AccountLogistic.css";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MobileLogo from "../Header/MobileLogo";
import { clearSingleCategory, fetchSingleDelivery } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";

class AccountLogistic extends React.Component {
  componentDidMount() {
    this.props.fetchSingleDelivery(
      this.props.match.params.deliveryId,
      this.props.history
    );
  }
  componentWillUnmount() {
    this.props.clearSingleCategory();
  }
  render() {
    if (!this.props.userDelivery) {
      return <ScreenLoader />;
    }
    const {
      receiverFullName,
      receiverPhoneNumber,
      itemName,
      itemQuantity,
      receiverAddress,
      delivered
    } = this.props.userDelivery;
    let user;
    if (this.props.userDelivery.user) {
      user = this.props.userDelivery.user;
    }
    if (this.props.userDelivery.userSeller) {
      user = this.props.userDelivery.userSeller;
    }
    const { address } = user;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <AccountHeader />
          <div className="container pending-reviews-wrapper">
            <div className="row">
              <div className="col-lg-4">
                <AccountMenu />
              </div>
              <div className="col-lg-8  box-container">
                <div className="d-flex align-items-center">
                  <div style={{ flex: "1" }}>
                    <IconContext.Provider
                      value={{ className: "arrow-icon ml-3 my-2" }}
                    >
                      <div
                        onClick={() =>
                          this.props.history.push("/account-logistics")
                        }
                        className="d-flex align-items-center"
                      >
                        <div style={{ cursor: "pointer" }}>
                          <BsArrowLeft />
                        </div>
                      </div>
                    </IconContext.Provider>
                  </div>

                  <h3 className="ml-1" style={{ flex: "2" }}>
                    Delivery Details
                  </h3>
                </div>

                <div className="box-container p-2 account-logistic">
                  <div className="container">
                    <p>
                      <b>Recipient: </b>
                      {receiverFullName}
                    </p>
                    <p>
                      <b>Phone: </b>0{receiverPhoneNumber}
                    </p>
                    <p>
                      {/* if not delivered */}
                      {/* <b>Item To Deliver: </b> Pizza */}
                      <b>Item Delivered: </b>
                      {itemName}
                    </p>
                    <p>
                      <b>Item Quantity: </b> {itemQuantity}
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
                      <b>Delivery Date: </b>1/1/2000
                    </p>
                    <p>
                      <b>Status: </b>
                      {delivered ? "Delivered" : "Pending"}
                    </p>
                  </div>
                </div>
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

const mapStateToProps = state => {
  return {
    userDelivery: state.user.userDelivery
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchSingleDelivery, clearSingleCategory })(
    AccountLogistic
  )
);
