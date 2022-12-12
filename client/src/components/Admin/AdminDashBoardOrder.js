import React from "react";

import "./AdminDashBoardOrder.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter, Redirect } from "react-router-dom";
import { fetchAdminOrder } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardOrder extends React.Component {
  componentDidMount() {
    this.props.fetchAdminOrder(
      this.props.match.params.orderId,
      this.props.history
    );
  }
  render() {
    if (!this.props.adminOrder) return <ScreenLoader />;
    if (this.props.adminOrderLoading) return <ScreenLoader />;
    if (this.props.adminOrder && this.props.adminOrder["0"]._id) {
      const totalCharge = this.props.adminOrder["0"].product
        .map(({ _id, price, charge }) => {
          const proExists = this.props.adminOrder["0"].items.find(
            (item) => item.product === _id
          );
          if (proExists) {
            return (price * charge * proExists.quantity) / 100;
          }
          return {
            _id,
            price,
            charge,
          };
        })
        .reduce((acc, cur) => acc + cur, 0);
      return (
        <div className="container-fluid p-0 mb-5">
          <MobileLogo />
          <AdminDashBoardHeader />
          <AdminDashboardSecondaryHeader />
          <div className="container mt-4">
            <div className="box-container">
              <div className="d-flex align-items-center">
                <div style={{ flex: "1" }}>
                  <IconContext.Provider
                    value={{ className: "arrow-icon ml-3 my-2" }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        onClick={() => this.props.history.goBack()}
                        style={{ cursor: "pointer" }}
                      >
                        <BsArrowLeft />
                      </div>
                    </div>
                  </IconContext.Provider>
                </div>

                <h3 className="ml-1" style={{ flex: "2" }}>
                  Order
                </h3>
              </div>
              <div className="container">
                <div className="box-container">
                  <div className="row pl-2">
                    <div className="col-md-6">
                      <p>
                        <strong className="mr-2">Order ID: </strong>
                        {this.props.adminOrder["0"]._id}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <strong className="mr-2">Date: </strong>
                      {new Date(
                        this.props.adminOrder["0"].createdAt
                      ).toLocaleString()}
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-md-6">
                      <p>
                        <strong className="mr-2">Status:</strong>
                        {(this.props.adminOrder["0"].cancelled && (
                          <span> Cancelled</span>
                        )) ||
                          (this.props.adminOrder["0"].delivered && (
                            <span> Delivered</span>
                          )) ||
                          (this.props.adminOrder["0"].paid &&
                            !this.props.adminOrder["0"].delivered && (
                              <span> Pending</span>
                            ))}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <strong className="mr-2">Items No: </strong>
                      {this.props.adminOrder["0"].items.length.toLocaleString()}
                    </div>
                  </div>
                  <div className="row pl-2">
                    <div className="col-md-6">
                      <p>
                        <strong className="mr-2">Buyer:</strong>
                        {this.props.adminOrder.buyer &&
                          this.props.adminOrder.buyer.firstName}{" "}
                        {this.props.adminOrder.buyer &&
                          this.props.adminOrder.buyer.lastName}
                      </p>
                      <p>
                        <strong className="mr-2">Delivery Method:</strong>
                        {this.props.adminOrder["0"].deliveryMethod}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong className="mr-2">Paid:</strong>
                        {this.props.adminOrder["0"].paid
                          ? this.props.adminOrder["0"].paid.toString()
                          : "false"}
                      </p>
                      <p>
                        <strong className="mr-2">Total Charge:</strong>Ksh.
                        {totalCharge &&
                          Math.round(
                            totalCharge +
                              this.props.adminOrder["0"].distance.shippingFees
                          ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "30px",
                      position: "relative",
                      bottom: "0px",
                      left: "0px",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTop: "1px solid #d4d4d4",
                      padding: "20px",
                    }}
                  >
                    <Link
                      to={`/root/admin-order/view-items/${this.props.adminOrder["0"]._id}`}
                      className="admin-order-items-view"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = (state) => {
  return {
    adminOrder: state.admin.adminOrder,
    adminOrderLoading: state.admin.adminOrderLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchAdminOrder })(AdminDashBoardOrder)
);
