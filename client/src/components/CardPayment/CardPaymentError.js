import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { Link, Redirect } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./CardPaymentError.css";
import { connect } from "react-redux";
import { removePendingAndSuccess } from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";

class StripeError extends React.Component {
  componentWillUnmount() {
    this.props.removePendingAndSuccess();
  }
  render() {
    if (!this.props.orderSuccess || this.props.orderSuccess._id)
      return <Redirect to="/" />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-9 col-lg-8 mx-auto">
                <div className="box-container py-3 pl-2 pr-1">
                  <div className="d-flex mb-3 align-items-center justify-content-center">
                    <AiOutlineExclamationCircle
                      style={{ fontSize: "100px", color: "#f76b1a" }}
                    />
                  </div>
                  <h2 style={{ textAlign: "center" }} className="mb-2">
                    Ooops!
                  </h2>
                  <p id="stripe-payment-error-info">
                    It seems your provider has rejected the transaction. Try a
                    different payment method or contact us
                    <Link className="mx-1" to="/contact-us">
                      here
                    </Link>{" "}
                    to assist you.
                  </p>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link
                      to="/checkout"
                      className="btn btn-md my-3 stripe-error-to-shop"
                    >
                      Go To Checkout
                    </Link>
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
    orderSuccess: state.cartReducer.orderSuccess
  };
};
export default connect(mapStateToProps, { removePendingAndSuccess })(
  StripeError
);
