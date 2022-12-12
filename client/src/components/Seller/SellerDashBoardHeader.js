import React from "react";
import { NavLink, Link } from "react-router-dom";

import "./SellerDashBoardHeader.css";
import Logo from "../Header/Logo";
import ProfileImage from "../Header/ProfileImage";
import SellerHamburger from "./SellerHamburgerMenu";
import { clearOrderDetails } from "../../redux/actions";
import { connect } from "react-redux";

class SellerDashBoardHeader extends React.Component {
  render() {
    return (
      <div className="primary-background d-flex" id="seller-dashboard-header">
        <SellerHamburger />
        <Logo id="seller-logo" />
        <ul id="seller-header-menu-items">
          <li className="my-4">
            <Link className="link" to="/">
              Buy
            </Link>
          </li>
          <li className="my-4">
            <NavLink
              className="link"
              activeClassName="seller-menu-acive"
              to="/seller/sell"
            >
              New Product
            </NavLink>
          </li>
          {/* <li className="my-4">
            <NavLink
              className="link"
              activeClassName="seller-menu-acive"
              to="/seller-orders"
            >
              Do Something
            </NavLink>
          </li> */}
          <li
            style={{ cursor: "pointer" }}
            className="my-4 link logout-seller-db-header-link"
            onClick={() => {
              this.props.clearOrderDetails();
              window.location.href = "/api/logout";
            }}
          >
            Logout
          </li>
        </ul>
        <ProfileImage id="header-profile-image" size={"40px"} />
      </div>
    );
  }
}

export default connect(null, { clearOrderDetails })(SellerDashBoardHeader);
