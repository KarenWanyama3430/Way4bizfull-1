import React from "react";

import "./MpesaPayment.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeOrder, fetchOrderSuccess } from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";

class MpesaPayment extends React.Component {
  state = { click: 0 };
  render() {
    if (!this.props.order) return <Redirect to="/checkout" />;
    if (this.props.order && !this.props.order.formValues)
      return <Redirect to="/checkout" />;
    if (
      this.props.order &&
      this.props.order.formValues &&
      !this.props.order.formValues.payment
    )
      return <Redirect to="/checkout" />;
    if (
      !this.props.distance ||
      (this.props.distance && Object.keys(this.props.distance).length === 0)
    )
      return <Redirect to="/checkout" />;
    if (!this.props.user || (this.props.user && !this.props.user.phoneNumber))
      return <Redirect to="/address" />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />

          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8 mx-auto">
                <div className="box-container py-3 pl-2 pr-1">
                  <h6 className="mb-2">
                    <Link id="change-payment-method" to="/checkout">
                      Change Payment Method
                    </Link>
                  </h6>
                  <h3>Mpesa Payment</h3>
                  <ul className="my-1 mpesa-payment-guide">
                    <li>
                      <p>
                        Ensure you have enough money in mpesa to make payment
                        for your order.
                      </p>
                    </li>
                    <li>
                      <p>
                        Once you initiate payment, a prompt will be sent to the
                        phone with this number 0{this.props.user.phoneNumber}.
                        <Link to="/address" className="ml-1">
                          <small>Change number here</small>
                        </Link>
                      </p>
                    </li>
                    <li>
                      <p>
                        This prompt will ask you to enter your mpesa pin. Key in
                        your pin and press OK.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>
                          Once you initiate payment don't leave this page.
                        </strong>
                      </p>
                    </li>

                    <button
                      disabled={
                        !this.props.distance ||
                        (this.props.distance &&
                          Object.keys(this.props.distance).length === 0) ||
                        this.state.click > 0
                      }
                      onClick={() => {
                        this.setState({
                          click: this.state.click + 1,
                        });
                        this.props.makeOrder(
                          {
                            ...this.props.order,
                          },
                          this.props.history
                        );
                      }}
                      className="btn btn-md initiate-payment"
                    >
                      Initiate Payment
                    </button>
                    <li>
                      <p>
                        This process may take up to 2 minutes.{" "}
                        <strong>Be patient</strong>.
                      </p>
                    </li>
                    <li>
                      <p>
                        On successful payment,you will receive an mpesa
                        confirmation message.
                      </p>
                    </li>
                    <li>
                      <p>Press the REDIRECT button for redirection.</p>
                    </li>
                    <button
                      className="btn btn-md initiate-payment"
                      disabled={
                        !this.props.pendingOrder ||
                        (this.props.pendingOrder &&
                          Object.keys(this.props.pendingOrder).length === 0)
                      }
                      onClick={() =>
                        this.props.fetchOrderSuccess(this.props.history)
                      }
                    >
                      {this.props.orderSuccessLoading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {this.props.orderSuccessLoading ? (
                        <span> {"  "}Loading...</span>
                      ) : (
                        <strong>REDIRECT</strong>
                      )}
                    </button>
                  </ul>
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
const mapStateToProps = (state) => {
  return {
    order: state.cartReducer.order,
    pendingOrder: state.cartReducer.pendingOrder,
    orderSuccessLoading: state.cartReducer.orderSuccessLoading,
    distance: state.detailsPersist.distance,
    user: state.auth.user,
  };
};
export default withRouter(
  connect(mapStateToProps, { makeOrder, fetchOrderSuccess })(MpesaPayment)
);
