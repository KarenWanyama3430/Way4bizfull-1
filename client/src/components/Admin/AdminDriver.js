import React from "react";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import "./AdminDriver.css";
import { connect } from "react-redux";
import MobileLogo from "../Header/MobileLogo";
import { emptyDriverDetails, fetchDriverDetails } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDriver extends React.Component {
  componentDidMount() {
    this.props.fetchDriverDetails(
      this.props.match.params.driverId,
      this.props.history
    );
  }
  componentWillUnmount() {
    this.props.emptyDriverDetails();
  }
  render() {
    if (!this.props.driverDetails) {
      return <ScreenLoader />;
    }
    const {
      driver: {
        firstName,
        lastName,
        IdNumber,
        phoneNumber,
        vehicleNo,
        free,
        email
      },
      deliveries
    } = this.props.driverDetails;
    return (
      <div className="container-fluid p-0 mb-5">
        <MobileLogo />
        <DashBoardHeader />
        <SecondaryHeader />
        <div className="mt-4 container">
          <div className="box-container">
            <div className="d-flex align-items-center">
              <div style={{ flex: "1" }}>
                <IconContext.Provider
                  value={{ className: "arrow-icon ml-3 my-2" }}
                >
                  <div className="d-flex align-items-center">
                    <Link to="/admin/drivers">
                      <BsArrowLeft />
                    </Link>
                  </div>
                </IconContext.Provider>
              </div>

              <h3 className="ml-1" style={{ flex: "2" }}>
                Driver Details
              </h3>
            </div>
            <div className="row p-3">
              <div className="col-md-6">
                <h6 className="my-1">
                  Name: {firstName} {lastName}{" "}
                </h6>
                <h6 className="my-1">Id No. {IdNumber}</h6>
                <h6 className="my-1">Phone: 0{phoneNumber}</h6>
              </div>
              <div className="col-md-6">
                <h6 className="my-1">Email: {email}</h6>
                <h6 className="my-1">Vehicle No. {vehicleNo}</h6>
                <h6 className="my-1">Status: {free ? "free" : "occupied"}</h6>
              </div>
            </div>
            <h4 className="pl-3 mt-2 mb-1">Deliveries Made</h4>
            <div className="mx-3" style={{ borderTop: "1px solid #d4d4d4" }}>
              {deliveries &&
                deliveries.length !== 0 &&
                deliveries.map(del => {
                  const {
                    itemName,
                    receiverPhoneNumber,
                    receiverCity,
                    receiverAddress
                  } = del;
                  let user;
                  if (del.user) {
                    user = del.user;
                  }
                  if (del.userSeller) {
                    user = del.userSeller;
                  }
                  const { phoneNumber, city, address } = user;
                  return (
                    <div key={del._id} className="my-1 driver-delivery">
                      <p>
                        Delivered {itemName}
                        <strong> FROM </strong>
                        {city}, {address} <strong> TO </strong>
                        {receiverCity}, {receiverAddress} on 1/1/2000.
                      </p>
                      <p>Sender Phone: 0{phoneNumber}</p>
                      <p>Recipient Phone: 0{receiverPhoneNumber}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    driverDetails: state.admin.driverDetails
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchDriverDetails, emptyDriverDetails })(
    AdminDriver
  )
);
