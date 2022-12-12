import React, { useState, useRef } from "react";
import { saveOrder } from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./CardPaymentButton.css";

const CardPaymentButton = ({
  saveOrder,
  history,
  saveOrderLoading,
  cart,
  distance
}) => {
  const [clicked, setClicked] = useState(false);
  const payment = useRef();
  const makePayment = () => {
    setClicked(true);
    if (!clicked) {
      saveOrder(history);
    }
  };
  const shippingFees = Math.round(distance.shippingFees);
  const total = cart
    .map(item => item.price * item.quantity)
    .reduce((acc, curr) => acc + curr, 0);
  return (
    <div>
      <button
        disabled={clicked}
        ref={payment}
        onClick={makePayment}
        className="secondary-button card-pay-button btn btn-block"
      >
        {saveOrderLoading && (
          <span
            className="spinner-grow spinner-grow-sm"
            role="status"
            aria-hidden="true"
          ></span>
        )}
        {saveOrderLoading ? (
          <span> {"  "}Loading...</span>
        ) : (
          <span>Pay Ksh.{(total + shippingFees).toLocaleString()}</span>
        )}
      </button>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    distance: state.detailsPersist.distance,
    cart: state.cartReducer.cart,
    makeOrderLoading: state.user.makeOrderLoading,
    saveOrderLoading: state.product.saveOrderLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { saveOrder })(CardPaymentButton)
);
