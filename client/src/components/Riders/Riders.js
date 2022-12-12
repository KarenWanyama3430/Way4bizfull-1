import React from "react";
import Tabs from "react-responsive-tabs";

import "./Riders.css";
import Logo from "../Header/Logo";
import SuccessfulDeliveries from "./SuccessfulDeliveries";
import { MdArrowDropDown } from "react-icons/md";
import ProfileImage from "../Header/ProfileImage";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchClients } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";

class Riders extends React.Component {
  componentDidMount() {
    this.props.fetchClients();
  }
  getTabs() {
    const data = [
      {
        name: "Deliveries",
        content: <SuccessfulDeliveries />,
      },
      // {
      //   name: "Pending Deliveries",
      //   content: <PendingDeliveries />,
      // },
    ];

    return data.map((d, index) => ({
      title: d.name,
      getContent: () => d.content,
      key: index,
      tabClassName: "rider-tab",
      panelClassName: "seller-db-panel",
    }));
  }
  render() {
    if (!this.props.user || (this.props.user && !this.props.user.IdNumber)) {
      return <Redirect to="/driver/sign-in" />;
    }
    if (!this.props.clients) {
      return <ScreenLoader />;
    }
    return (
      <div>
        <div id="rider-header">
          <div className="container p-0">
            <Logo />
            <div className="d-flex align-items-center">
              <div className="rider-logout-wrapper-md">
                <p>
                  <Link to="/rider/change/password">Change Password</Link>
                </p>
                <p
                  onClick={() => {
                    window.location.href = "/api/logout";
                  }}
                >
                  Logout
                </p>
              </div>
              <div className="rider-profile">
                <ProfileImage size={"50px"} />
                <div className="rider-logout-wrapper">
                  <MdArrowDropDown
                    style={{ fontSize: "30px", color: "#f76b1a" }}
                  />
                  <div className="rider-logout">
                    <p>
                      <Link to="/rider/change/password">Change Password</Link>
                    </p>
                    <p
                      onClick={() => {
                        window.location.href = "/api/logout";
                      }}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="white-body rider-body">
          <div className="container">
            <div>
              <h3 className="mb-3">Welcome {this.props.user.firstName},</h3>
            </div>
            <div>
              <Tabs
                items={this.getTabs()}
                transformWidth={100}
                transform={true}
                showMoreLabel={"More..."}
                showInkBar={true}
              />
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
    clients: state.riders.clients,
  };
};
export default connect(mapStateToProps, { fetchClients })(Riders);
