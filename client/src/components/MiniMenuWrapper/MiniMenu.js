import React from "react";
import { NavLink } from "react-router-dom";
import Tooltip from "react-png-tooltip";
import { IconContext } from "react-icons";
import {
  AiOutlineHome,
  AiOutlineBars,
  AiOutlineUser,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaOpencart, FaStore } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { connect } from "react-redux";
import { GoClippy } from "react-icons/go";
import "./MiniMenu.css";
import { BsExclamationCircle } from "react-icons/bs";
import { clearOrderDetails } from "../../redux/actions";
import { RiMotorbikeLine } from "react-icons/ri";

class MiniMenu extends React.Component {
  render() {
    return (
      <div id="mini-menu">
        <div className="container-fluid">
          <div className="row flex-wrap">
            <NavLink
              to="/"
              activeClassName="active"
              exact
              className="primary-link col-3"
            >
              <div className="mini-menu-item">
                {/* <div className="flaticon-home mini-menu-icon"></div> */}
                <IconContext.Provider value={{ className: "mini-menu-icon" }}>
                  <div className="icon-container">
                    <AiOutlineHome />
                  </div>
                </IconContext.Provider>
                <p>Home</p>
              </div>
            </NavLink>

            <NavLink to="/categories" className="primary-link col-3">
              <div className="mini-menu-item">
                {/* <div className="flaticon-category mini-menu-icon"></div> */}
                <IconContext.Provider value={{ className: "mini-menu-icon" }}>
                  <div className="icon-container">
                    <AiOutlineBars />
                  </div>
                </IconContext.Provider>
                <p>Categories</p>
              </div>
            </NavLink>

            <NavLink to="/cart" className="primary-link col-3">
              <div className="mini-menu-item mini-cart">
                <IconContext.Provider value={{ className: "mini-menu-icon" }}>
                  <div className="icon-container">
                    <FaOpencart />
                    <span className="badge ml-1">
                      {this.props.cart &&
                        this.props.cart
                          .map((item) => item.quantity)
                          .reduce((cur, acc) => cur + acc, 0)}
                    </span>
                  </div>
                </IconContext.Provider>
                <p>Cart</p>
              </div>
            </NavLink>

            {this.props.user ? (
              <div className="col-3" id="account-mini-link-wrapper">
                <Tooltip
                  className="primary-link tool-tip"
                  tooltip={
                    <div className="mini-menu-item">
                      {/* <div className="flaticon-user mini-menu-icon"></div> */}
                      <IconContext.Provider
                        value={{ className: "mini-menu-icon" }}
                      >
                        <div className="icon-container">
                          <AiOutlineUser />
                        </div>
                      </IconContext.Provider>
                      <p>Account</p>
                    </div>
                  }
                >
                  <div className="account-mini-links">
                    <NavLink
                      className="primary-link"
                      to="/account"
                      activeClassName="active"
                      exact
                    >
                      <AiOutlineUser />
                      <span className="ml-2">My Account</span>
                    </NavLink>
                    <NavLink className="primary-link" to="/orders">
                      <GoClippy />
                      <span className="ml-2">Orders</span>
                    </NavLink>
                    <NavLink
                      className="primary-link d-flex align-items-center"
                      to="/wishlist"
                    >
                      <AiOutlineHeart />
                      <span className="ml-2">
                        <span style={{ marginTop: "5px" }}>Wishlist</span>
                        <span
                          className="ml-1 badge"
                          style={{ backgroundColor: "#f76b1a", color: "#fff" }}
                        >
                          {this.props.wishlist.length}
                        </span>
                      </span>{" "}
                    </NavLink>
                    <NavLink className="primary-link" to="/pending/reviews">
                      <MdRateReview />
                      <span className="ml-2">Pending Reviews</span>
                    </NavLink>
                    <NavLink className="primary-link" to="/complaints">
                      <BsExclamationCircle />
                      <span className="ml-2">Complaints</span>
                    </NavLink>
                    {this.props.user || this.props.user.isAdmin ? (
                      <NavLink className="primary-link" to="/account-logistics">
                        <RiMotorbikeLine />
                        <span className="ml-2">Logistics</span>
                      </NavLink>
                    ) : null}

                    {this.props.user && this.props.user.storeName && (
                      <NavLink className="primary-link" to="/seller-dashboard">
                        <FaStore />
                        <span className="ml-2">My Store</span>
                      </NavLink>
                    )}
                    {this.props.user && this.props.user.isAdmin && (
                      <NavLink className="primary-link" to="/admin-dashboard">
                        <FaStore />
                        <span className="ml-2">Dashboard</span>
                      </NavLink>
                    )}
                    <div id="mini-logout-link-wrapper">
                      <div
                        style={{ cursor: "pointer" }}
                        className="mini-logout-link primary-link"
                        onClick={() => {
                          this.props.clearOrderDetails();
                          window.location.href = "/api/logout";
                        }}
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <NavLink to="/sign-in" className="primary-link col-3">
                <div className="mini-menu-item">
                  <IconContext.Provider value={{ className: "mini-menu-icon" }}>
                    <div className="icon-container">
                      <AiOutlineUser />
                    </div>
                  </IconContext.Provider>
                  <p>Account</p>
                </div>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    cart: state.cartReducer.cart,
    wishlist: state.cartReducer.wishlist,
  };
};

export default connect(mapStateToProps, { clearOrderDetails })(MiniMenu);
