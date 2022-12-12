import React from "react";
import "./OrderPaymentSuccess.css";
import Header from "../Header/Header";
import { Link, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { BsCheckCircle } from "react-icons/bs";
import { connect } from "react-redux";
import Image from "../Market/Image";
import { deleteCart, removePendingAndSuccess } from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";

class OrderPaymentSuccess extends React.Component {
  componentWillUnmount() {
    this.props.deleteCart();
    this.props.removePendingAndSuccess();
  }
  render() {
    if (!this.props.orderSuccess) return <Redirect to="/" />;
    if (this.props.orderSuccess && this.props.orderSuccess.message)
      return <Redirect to="/mpesa/error" />;
    let shippingFees;
    if (
      this.props.orderSuccess &&
      this.props.orderSuccess.distance &&
      this.props.orderSuccess.distance.shippingFees === 0
    ) {
      shippingFees = null;
    } else if (
      !this.props.orderSuccess ||
      (this.props.orderSuccess && !this.props.orderSuccess.distance)
    ) {
      shippingFees = null;
    } else {
      shippingFees = this.props.orderSuccess.distance.shippingFees;
    }

    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container mt-3">
            <div className="row">
              <div className="col-md-9 m-0 col-lg-8 mx-auto">
                <div className="box-container py-3 pl-2 pr-1 successful-order">
                  <div className="d-flex align-items-center justify-content-center">
                    <BsCheckCircle
                      style={{ fontSize: "100px", color: "#4BB543" }}
                    />
                  </div>
                  <h3 className="my-3" style={{ textAlign: "center" }}>
                    We've got it!
                  </h3>
                  <h6 className="order-placement-top">
                    Your order has been placed.We have also sent you an email
                    confirmation.You can check the status of{" "}
                    <Link
                      to={`/buyer/order/details/${this.props.orderSuccess._id}`}
                      className="mx-1"
                      id="check-order-status"
                    >
                      Order {this.props.orderSuccess._id}
                    </Link>{" "}
                    at any time from your account.
                  </h6>
                  <h5 className="mt-4 mb-2">Order Summary</h5>
                  <div style={{ borderBottom: "1px solid #d4d4d4" }}></div>
                  {/* mapping here */}
                  {this.props.orderSuccess.items &&
                    this.props.orderSuccess.items.length !== 0 &&
                    this.props.orderSuccess.items.map(item => (
                      <div
                        className="row align-items-center success-order-item"
                        key={item._id}
                      >
                        <div className="col-3">
                          <Image
                            width="100%"
                            image={
                              item.product.imageUrl[0].includes("http")
                                ? item.product.imageUrl[0]
                                : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.product.imageUrl[0]} `
                            }
                            alt={item.product.imageUrl[0]}
                          />
                        </div>
                        <div className="col-9">
                          <h6 className="order-item-name mb-2">
                            {item.product.name}
                          </h6>
                          <h6 style={{ display: "inline-block" }}>
                            Qty:{" "}
                            <span>
                              {item.quantity} @ ksh.
                              {item.product.price.toLocaleString()} each
                            </span>
                          </h6>
                        </div>
                      </div>
                    ))}
                  {/* mapping ends here */}
                  {/* <div style={{ borderBottom: "1px solid #d4d4d4" }}></div> */}
                  <div className="order-amounts mt-3">
                    <div>
                      <h5>Order Subtotal</h5>
                      <p>
                        Ksh.
                        {this.props.orderSuccess.totalPrice && shippingFees
                          ? Math.round(
                              this.props.orderSuccess.totalPrice - shippingFees
                            ).toLocaleString()
                          : Math.round(
                              this.props.orderSuccess.totalPrice
                            ).toLocaleString()}{" "}
                      </p>
                    </div>
                    <div>
                      <h5>Shipping Cost</h5>
                      <p>
                        Ksh.{" "}
                        {shippingFees
                          ? Math.round(shippingFees).toLocaleString()
                          : 0}{" "}
                      </p>
                    </div>
                    <div className="mt-3" style={{ color: "#f76b1a" }}>
                      <h5>
                        <strong>Order Total</strong>
                      </h5>
                      <p>
                        <strong>
                          Ksh.
                          {this.props.orderSuccess.totalPrice &&
                            this.props.orderSuccess.distance &&
                            this.props.orderSuccess.totalPrice.toLocaleString()}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "3px solid #000" }}
                    className="my-3"
                  ></div>
                  <h5 className="mb-2">Payment Information</h5>
                  <div className="order-payment-info">
                    <div>
                      {this.props.orderSuccess.paymentMethod === "mpesa" ? (
                        <React.Fragment>
                          <h5>Phone Number</h5>0{this.props.user.phoneNumber}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <h5>
                            {`${this.props.orderSuccess.brand[0].toUpperCase()}${this.props.orderSuccess.brand.substring(
                              1
                            )}`}
                          </h5>
                          <p>***********{this.props.orderSuccess.last4}</p>
                        </React.Fragment>
                      )}
                    </div>
                    <div>
                      <h5>Amount</h5>
                      <p>
                        Ksh.
                        {this.props.orderSuccess.totalPrice &&
                          this.props.orderSuccess.distance &&
                          this.props.orderSuccess.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d4d4" }}
                    className="my-3"
                  ></div>
                  <h5 className="mb-2">Shipping Address</h5>
                  <div>
                    <div>
                      <h6>
                        {this.props.orderSuccess.distance &&
                          this.props.orderSuccess.distance.destination}
                      </h6>
                    </div>
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d4d4" }}
                    className="my-3"
                  ></div>
                  <h5 className="mb-2">For Help</h5>
                  <div id="order-help">
                    <h6>
                      View all order details{" "}
                      <Link
                        to={`/buyer/order/details/${this.props.orderSuccess._id}`}
                      >
                        here
                      </Link>{" "}
                      or contact <Link to="/contact-us">Customer Service.</Link>
                    </h6>
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
    orderSuccess: state.cartReducer.orderSuccess,
    user: state.auth.user
  };
};
export default connect(mapStateToProps, {
  deleteCart,
  removePendingAndSuccess
})(OrderPaymentSuccess);
