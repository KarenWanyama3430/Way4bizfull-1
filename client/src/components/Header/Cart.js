import React from "react";
import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { IconContext } from "react-icons";
import "./Cart.css";
import { connect } from "react-redux";

class Cart extends React.Component {
  render() {
    return (
      <Link to="/cart" className="secondary-link">
        {/* <div className="icon cart-icon flaticon-shopping-cart"> */}
        <IconContext.Provider value={{ className: "icon cart-icon" }}>
          <div className="icon-container">
            <FaOpencart />
            <span className="badge ml-1">
              {(this.props.cart &&
                this.props.cart
                  .map(item => item.quantity)
                  .reduce((cur, acc) => cur + acc, 0)) ||
                0}
            </span>
          </div>
        </IconContext.Provider>

        {/* </div> */}
      </Link>
    );
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cartReducer.cart
  };
};
export default connect(mapStateToProps)(Cart);
