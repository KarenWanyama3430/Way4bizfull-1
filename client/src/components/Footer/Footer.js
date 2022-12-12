import React from "react";
import { Link } from "react-router-dom";

import "./Footer.css";
import { connect } from "react-redux";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer primary-background">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-3">
              <h6>Help</h6>
              <div className="site-footer-info">
                <p>
                  <Link to="/help-center">Help center</Link>
                </p>
                <p>
                  <Link to="/contact-us">Contact Us</Link>
                </p>
                <p>
                  <Link to="/return-policy">Return Policy</Link>
                </p>
                <p>
                  <Link to="/contact-us">Suggest a Product</Link>
                </p>
                <p>
                  <Link to="/contact-us">Submit an Idea</Link>
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <h6>Account</h6>
              <div className="site-footer-info">
                <p>
                  <Link to="/account">My Account</Link>
                </p>
                <p>
                  <Link to="/orders">My Orders</Link>
                </p>
                <p>
                  <Link to="/pending/reviews">Pending Reviews</Link>
                </p>
                <p>
                  <Link to="/complaints">Complaints</Link>
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <h6>Company</h6>
              <div className="site-footer-info">
                <p>
                  <Link to="/about-us">About Us</Link>
                </p>
                <p>
                  {this.props.user && this.props.user.isSeller && (
                    <Link to="/seller/sell">Sell on Way4Biz</Link>
                  )}
                  {!this.props.isSignedIn && (
                    <Link to="/seller/register">Sell on Way4Biz</Link>
                  )}
                </p>
                <p>
                  <Link to="/terms">Terms and Conditions</Link>
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <h6>Payment Methods</h6>
              <div className="site-footer-info">
                <div className="mb-2">
                  <img title="mpesa" src="/mpesa.png" alt="mpesa" />
                </div>
                <div>
                  <img title="visa" src="/debit.png" alt="debit" />
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ borderTop: "1px solid #eaecee" }}>
            <div className="col copyright">
              <p>&copy;{1900 + new Date().getYear()}. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps)(Footer);
