import React from "react";
import HamburgerMenu from "react-hamburger-menu";
import "./AdminDashboardSecondaryHeader.css";
import {
  RiDashboardLine,
  RiFileUserLine,
  RiInboxArchiveLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { GoClippy } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import MenuDropdown from "./MenuDropdown";
import { MdKeyboardArrowDown, MdArrowDropDown, MdRedeem } from "react-icons/md";
import { connect } from "react-redux";
import {
  fetchNewSellers,
  clearOrderDetails,
  redeemCountAction,
} from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import AdminProfile from "./AdminProfile";
import { IconContext } from "react-icons";

class AdminDashboardSecondaryHeader extends React.Component {
  state = {
    open: false,
    keys: [
      {
        parentKey: ["Members", 100],
        childKeys: [
          { name: "Active Sellers", url: "/admin-sellers" },
          {
            name: "New Sellers",
            url: "/admin-new-sellers",
            num: 100,
          },
          { name: "Add Driver", url: "/admin/add-driver" },
          { name: "Drivers", url: "/admin/drivers" },
        ],
      },
    ],
  };
  componentDidMount() {
    this.props.fetchNewSellers();
    this.props.redeemCountAction();
  }
  handleClick = (e) => {
    this.setState((prevState) => {
      return {
        open: !prevState.open,
      };
    });
  };
  render() {
    if (!this.props.newSellers || !this.props.redeemCount)
      return <ScreenLoader />;
    return (
      <div className="container-fluid admin-dashboard-secondary-header">
        {this.state.open ? (
          <div
            onClick={this.handleClick}
            className="back-shed"
            style={{ backgroundColor: "transparent" }}
          ></div>
        ) : null}
        <div className="admin-hamburger-menu-wrapper">
          <div className="admin-hamburger-menu">
            {this.state.open ? (
              <HamburgerMenu
                width={30}
                height={20}
                color="#f76b1a"
                isOpen={true}
                menuClicked={this.handleClick}
              />
            ) : (
              <HamburgerMenu
                width={30}
                height={20}
                color="#f76b1a"
                isOpen={false}
                menuClicked={this.handleClick}
              />
            )}
          </div>
          {this.state.open ? (
            <div className="admin-dashboard-sm-menu">
              <p>
                <NavLink to="/admin-dashboard">Dashboard</NavLink>
              </p>
              <MenuDropdown
                data={this.state.keys[0]}
                newSellers={this.props.newSellers.sellers.length.toLocaleString()}
              />
              <p>
                <NavLink to="/admin-orders">Orders</NavLink>
              </p>
              <p>
                <NavLink to="/admin-categories">Categories</NavLink>
              </p>
              <p>
                <NavLink to="/admin-redeems">
                  Redeems
                  {this.props.redeems !== 0 && (
                    <span
                      style={{
                        position: "relative",
                        zIndex: "32",
                        backgroundColor: "#f76b1a",
                        color: "#fff",
                      }}
                      className="ml-1 badge"
                    >
                      {this.props.redeems.toLocaleString()}
                    </span>
                  )}
                </NavLink>
              </p>
              <p>
                <NavLink to="/admin-inbox">Inbox</NavLink>
              </p>
            </div>
          ) : null}
        </div>
        <div className="container admin-dashboard-menu-lg-items">
          <ul>
            <li>
              <NavLink
                to="/admin-dashboard"
                activeClassName="admin-active-lg-link"
                exact
              >
                <RiDashboardLine /> <span className="ml-2">Dashboard</span>
              </NavLink>
            </li>
            <li style={{ cursor: "pointer" }}>
              <a href="/" className="admin-menu-dropdown-main">
                <RiFileUserLine />{" "}
                <span style={{ cursor: "pointer" }} className="ml-1">
                  Members
                  {this.props.newSellers &&
                    this.props.newSellers.sellers &&
                    this.props.newSellers.sellers.length !== 0 && (
                      <span
                        className="ml-1 badge"
                        style={{
                          position: "relative",
                          zIndex: "32",
                          backgroundColor: "#f76b1a",
                          color: "#fff",
                        }}
                      >
                        {this.props.newSellers.sellers.length.toLocaleString()}
                      </span>
                    )}
                </span>
                <span className="ml-1">
                  <MdKeyboardArrowDown />
                </span>
              </a>

              <div className="members-dropdown">
                <p>
                  <NavLink to="/admin-sellers">Active Sellers</NavLink>
                </p>
                <p>
                  <NavLink to="/admin-new-sellers">
                    New Sellers
                    {this.props.newSellers &&
                      this.props.newSellers.sellers &&
                      this.props.newSellers.sellers.length !== 0 && (
                        <span
                          className="ml-1 badge"
                          style={{
                            position: "relative",
                            zIndex: "32",
                            backgroundColor: "#f76b1a",
                            color: "#fff",
                          }}
                        >
                          {this.props.newSellers.sellers.length}
                        </span>
                      )}
                  </NavLink>
                </p>
                <p>
                  <NavLink to="/admin/add-driver">Add Driver</NavLink>
                </p>
                <p>
                  <NavLink to="/admin/drivers">Drivers</NavLink>
                </p>
              </div>
            </li>
            <li>
              <NavLink
                exact
                to="/admin-orders"
                activeClassName="admin-active-lg-link"
              >
                <GoClippy /> <span className="ml-2">Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/admin-categories"
                activeClassName="admin-active-lg-link"
              >
                <IoIosAddCircleOutline />{" "}
                <span className="ml-2">Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/admin-redeems"
                activeClassName="admin-active-lg-link"
              >
                <MdRedeem />{" "}
                <span className="ml-2">
                  Redeems
                  {this.props.redeems !== 0 && (
                    <span
                      style={{
                        position: "relative",
                        zIndex: "32",
                        backgroundColor: "#f76b1a",
                        color: "#fff",
                      }}
                      className="ml-1 badge"
                    >
                      {this.props.redeems.toLocaleString()}
                    </span>
                  )}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/admin-inbox"
                activeClassName="admin-active-lg-link"
              >
                <RiInboxArchiveLine />{" "}
                <span className="ml-2">
                  Inbox
                  <span
                    className="ml-1 badge"
                    style={{
                      position: "relative",
                      zIndex: "32",
                      backgroundColor: "#f76b1a",
                      color: "#fff",
                    }}
                  >
                    {this.props.inboxCount && this.props.inboxCount.count}
                  </span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <AdminProfile  /> */}
        <div id="admin-profile-section">
          <div className="d-flex align-items-center">
            <AdminProfile id="admin-secondary-header-profile-image" />
            <IconContext.Provider
              value={{ className: "admin-secondary-header-dropdown-icon" }}
            >
              <MdArrowDropDown />
            </IconContext.Provider>
          </div>
          <div className="admin-logout-section">
            <p
              className="p-2"
              onClick={() => {
                this.props.clearOrderDetails();
                window.location.href = "/api/logout";
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    newSellers: state.admin.newSellers,
    redeems: state.admin.redeemCount && state.admin.redeemCount.redeems,
    redeemCount: state.admin.redeemCount,
    inboxCount: state.admin.inboxCount,
  };
};
export default connect(mapStateToProps, {
  fetchNewSellers,
  clearOrderDetails,
  redeemCountAction,
})(AdminDashboardSecondaryHeader);
