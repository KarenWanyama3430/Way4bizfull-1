import React from "react";
import { NavLink } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { MdRateReview, MdControlPointDuplicate } from "react-icons/md";
import { BsFillBagFill } from "react-icons/bs";
import { GoClippy, GoSettings } from "react-icons/go";
import { GiCancel } from "react-icons/gi";
import "./SellerDashBoardMenu.css";
import ProfileImage from "../Header/ProfileImage";
import { fetchRejects } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import { connect } from "react-redux";

class SellerDashBoardMenu extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.isSeller) {
      this.props.fetchRejects();
    }
  }
  render() {
    if (this.props.user && this.props.user.isSeller) {
      if (!this.props.sellerRejects) return <ScreenLoader />;
    }
    return (
      <div className="primary-background" id="seller-dashboard-menu">
        <ul id="seller-menu-items">
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller-dashboard"
          >
            <li>
              <RiDashboardLine className="mr-2" />
              Dashboard
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller-products"
          >
            <li>
              <BsFillBagFill className="mr-2" />
              Products
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller-orders"
          >
            <li>
              <GoClippy className="mr-2" />
              Orders
              {this.props.dashboard && this.props.dashboard.newOrders !== 0 && (
                <span
                  className="badge ml-2"
                  style={{ color: "#fff", backgroundColor: "#f76b1a" }}
                >
                  {this.props.dashboard &&
                    this.props.dashboard.newOrders &&
                    this.props.dashboard.newOrders !== 0 &&
                    this.props.dashboard.newOrders.toLocaleString()}
                </span>
              )}
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller-review"
          >
            <li>
              <MdRateReview className="mr-2" />
              Reviews
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller/products/rejected"
          >
            <li>
              <GiCancel className="mr-2" />
              Rejects
              {this.props.sellerRejects &&
                this.props.sellerRejects.length !== 0 && (
                  <span
                    className="badge ml-2"
                    style={{ color: "#fff", backgroundColor: "#f76b1a" }}
                  >
                    {this.props.sellerRejects.length}
                  </span>
                )}
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/points"
          >
            <li>
              <MdControlPointDuplicate className="mr-2" />
              Points
            </li>
          </NavLink>
          <NavLink
            className="link"
            activeClassName="seller-menu-active"
            to="/seller/settings"
          >
            <li>
              <GoSettings className="mr-2" />
              Settings
            </li>
          </NavLink>
        </ul>
        <div id="seller-menu-profile">
          <ProfileImage id="seller-menu-user-icon" size={"70px"} />
          <h6 className="ml-2">Hi {this.props.user.firstName}</h6>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sellerRejects: state.product.sellerRejects,
    sellerOrders: state.seller.sellerOrders,
    user: state.auth.user,
    dashboard: state.detailsPersist.dashboard
  };
};
export default connect(mapStateToProps, {
  fetchRejects
})(SellerDashBoardMenu);
