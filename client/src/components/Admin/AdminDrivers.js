import React from "react";

import "./AdminDrivers.css";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MobileLogo from "../Header/MobileLogo";
import { fetchAllDrivers } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDrivers extends React.Component {
  componentDidMount() {
    this.props.fetchAllDrivers();
  }
  render() {
    if (!this.props.drivers) {
      return <ScreenLoader />;
    }
    return (
      <div className="container-fluid p-0 mb-5">
        <MobileLogo />
        <DashBoardHeader />
        <SecondaryHeader />
        <div className="container box-container mt-4">
          <div className="col">
            <h3 style={{ textAlign: "center" }}>Drivers</h3>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div className="row y">
                <div className="col-md-3">
                  <h6 style={{ paddingLeft: "15px" }}>Driver Name</h6>
                </div>
                <div className="col-md-3">
                  <h6 style={{ paddingLeft: "15px" }}>Phone</h6>
                </div>
                <div className="col-md-3">
                  <h6>ID No.</h6>
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* mapping here */}
              {this.props.drivers.length !== 0 &&
                this.props.drivers.map(driver => (
                  <div key={driver._id} className="admin-seller container">
                    <div className="row box-container py-2">
                      <div className="col-md-3">
                        {/* <div className="admin-seller-details"> */}
                        <p className="d-flex m-1">
                          <strong className="mr-2 x">Name:</strong>
                          {driver.firstName} {driver.lastName}
                        </p>
                        {/* </div> */}
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p className="d-flex m-1">
                          <strong className="mr-2 x">Phone:</strong> 0
                          {driver.phoneNumber}
                        </p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p className="d-flex m-1">
                          <strong className="x mr-2">ID No.</strong>
                          {driver.IdNumber}
                        </p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p>
                          <Link
                            to={`/admin/driver/${driver._id}`}
                            className="admin-seller-view-more"
                          >
                            View More
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    drivers: state.admin.drivers
  };
};

export default connect(mapStateToProps, { fetchAllDrivers })(AdminDrivers);
