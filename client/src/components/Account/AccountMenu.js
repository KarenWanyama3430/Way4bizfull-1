import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./AccountMenu.css";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdRateReview } from "react-icons/md";
import { GoClippy } from "react-icons/go";
import { BsExclamationCircle } from "react-icons/bs";
import { connect } from "react-redux";
import { clearOrderDetails } from "../../redux/actions";
import { RiMotorbikeLine } from "react-icons/ri";

export class AccountMenu extends Component {
  render() {
    if (this.props.isSignedIn) {
      return (
        <div className="box-container account-menu-container mb-3 p-0">
          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/account"
              className="navlink"
            >
              <AiOutlineUser />
              <span className="ml-2">My Account</span>
            </NavLink>
          </div>

          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/orders"
              className="navlink"
            >
              <GoClippy />
              <span className="ml-2">Orders</span>
            </NavLink>
          </div>

          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/wishlist"
              className="navlink"
            >
              <AiOutlineHeart />
              <span className="ml-2">Wishlist</span>
            </NavLink>
          </div>

          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/pending/reviews"
              className="navlink"
            >
              <MdRateReview />
              <span className="ml-2">Pending Reviews</span>
            </NavLink>
          </div>

          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/complaints"
              className="navlink"
            >
              <BsExclamationCircle />
              <span className="ml-2">Complaints</span>
            </NavLink>
          </div>

          <div className="account-menu-wrapper">
            <NavLink
              activeClassName="account-active"
              to="/account-logistics"
              className="navlink"
            >
              <RiMotorbikeLine />
              <span className="ml-2">Logistics</span>
            </NavLink>
          </div>

          <div
            id="account-logout"
            className="account-menu-wrapper account-logout-wrapper"
            onClick={() => {
              this.props.clearOrderDetails();
              window.location.href = "/api/logout";
            }}
          >
            Logout
          </div>
          <br />
          {/* <br /> */}
        </div>
      );
    }
    return null;
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { clearOrderDetails })(AccountMenu);
