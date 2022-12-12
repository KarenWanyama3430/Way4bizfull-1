import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { GoClippy } from "react-icons/go";
import "./User.css";
import { connect } from "react-redux";
import { FaStore } from "react-icons/fa";
import { clearOrderDetails } from "../../redux/actions";

class User extends React.Component {
  render() {
    return (
      <div id="user-auth" style={{ cursor: "pointer" }}>
        {/* <div className="icon user-icon flaticon-user secondary-link"> */}
        <IconContext.Provider value={{ className: "icon user-icon" }}>
          <div className="icon-container">
            <AiOutlineUser />
            <span>
              {this.props.user ? (
                <span style={{ color: "#f76b1a" }}>
                  Hello, {this.props.user.firstName}{" "}
                </span>
              ) : (
                <span
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "#f76b1a"
                  }}
                >
                  Sign In | Join
                </span>
              )}
            </span>
          </div>
        </IconContext.Provider>

        {/* </div> */}
        <div id="auth-info">
          {this.props.user ? (
            <div className="my-account mt-4">
              <NavLink
                activeClassName="active"
                to="/account"
                className="primary-link my-account-link"
              >
                <AiOutlineUser />
                <span className="ml-2">My Account</span>
              </NavLink>
              <NavLink to="/orders" className="primary-link my-account-link">
                <GoClippy />
                <span className="ml-2">Orders</span>
              </NavLink>
              <NavLink to="/wishlist" className="primary-link my-account-link">
                <AiOutlineHeart />
                <span className="ml-2">WishList</span>
              </NavLink>
              {this.props.user.storeName && (
                <NavLink
                  to="/seller-dashboard"
                  className="primary-link my-account-link"
                >
                  <FaStore />
                  <span className="ml-2">My Store</span>
                </NavLink>
              )}
              {this.props.user.isAdmin && (
                <NavLink
                  to="/admin-dashboard"
                  className="primary-link my-account-link"
                >
                  <FaStore />
                  <span className="ml-2">Dashboard</span>
                </NavLink>
              )}
              <div
                className="logout-link"
                onClick={() => {
                  this.props.clearOrderDetails();
                  window.location.href = "/api/logout";
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <React.Fragment>
              <p>Welcome</p>
              <Link to="/sign-in" className="btn btn-md login">
                Sign In
              </Link>
              <hr style={{ backgroundColor: "#eee" }} />
              <p>Sign in with:</p>
              <div className="auth-btns">
                <a href="/auth/google" className="btn btn-md google">
                  Google
                </a>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps, { clearOrderDetails })(User);
