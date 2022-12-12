import React from "react";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import "./AdminDashBoardOrderItems.css";
import { Link, withRouter } from "react-router-dom";
import { fetchAdminOrder, confirmDelivery } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import Image from "../Market/Image";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardOrderItems extends React.Component {
  componentDidMount() {
    this.props.fetchAdminOrder(
      this.props.match.params.orderId,
      this.props.history
    );
  }
  render() {
    if (!this.props.adminOrder) return <ScreenLoader />;
    return (
      <div className="container-fluid p-0 mb-5">
        <MobileLogo />
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="container mt-4">
          <div className="box-container admin-order-items-wrapper">
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
                Ordered Items
              </h3>
            </div>

            <div className="container">
              <div className="row y order-title">
                <div className="col-md-3">
                  <h6 style={{ paddingLeft: "20%" }}>Item</h6>
                </div>
                <div className="col-md-5">
                  <h6>Item Info</h6>
                </div>
                <div className="col-md-4">
                  <h6>Seller</h6>
                </div>
              </div>
              <div className="admin-order-items-wrapper">
                {/* mapping here */}
                {this.props.adminOrder["0"].product.length !== 0 &&
                  this.props.adminOrder["0"].product.map((p) => (
                    <div
                      key={p._id}
                      className="box-container row align-items-center"
                      style={{ borderLeft: "3px solid #f76b1a" }}
                    >
                      <div className="col-md-3">
                        <Image
                          width={"100px"}
                          image={
                            p.imageUrl[0].includes("http")
                              ? p.imageUrl[0]
                              : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${p.imageUrl[0]} `
                          }
                          alt={p.imageUrl[0]}
                        />
                      </div>
                      <div className="col-md-5 admin-order-product">
                        <p
                          className="admin-order-item-name"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.props.history.push(`/product/${p._id}`)
                          }
                        >
                          {p.name}
                        </p>
                        <p>
                          <strong>Ksh.</strong>
                          {p.price.toLocaleString()}{" "}
                        </p>
                        <p>
                          <strong>Qty: </strong>
                          {
                            this.props.adminOrder["0"].items.find(
                              (it) => it.product === p._id
                            ).quantity
                          }
                        </p>
                        <p>
                          <strong>Charge: </strong>
                          Ksh.
                          {(
                            this.props.adminOrder["0"].items.find(
                              (it) => it.product === p._id
                            ).quantity * p.charge
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p>
                          <strong className="x mr-1">Seller:</strong>
                          {this.props.adminOrder["0"].seller[0].firstName}{" "}
                          {this.props.adminOrder["0"].seller[0].lastName}
                        </p>
                        <p>
                          <Link
                            to={`/seller/store/${this.props.adminOrder["0"].seller[0]._id}`}
                            className="admin-order-visit-store"
                          >
                            Visit Store
                          </Link>
                        </p>
                      </div>
                    </div>
                  ))}
                {this.props.adminOrder["0"].paid &&
                  this.props.adminOrder["0"].dispatched &&
                  !this.props.adminOrder["0"].delivered && (
                    <div
                      className="container-fluid d-flex  mt-4 justify-content-center"
                      style={{ height: "30px" }}
                    >
                      <button
                        className="btn btn-lg confirm-delivery-btn"
                        onClick={() =>
                          this.props.confirmDelivery(
                            this.props.adminOrder["0"]._id,
                            this.props.history
                          )
                        }
                      >
                        {this.props.deliveryLoading && (
                          <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {this.props.deliveryLoading ? (
                          <span> {"  "}Loading...</span>
                        ) : (
                          <span>Confirm Delivery</span>
                        )}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    adminOrder: state.admin.adminOrder,
    deliveryLoading: state.admin.deliveryLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchAdminOrder, confirmDelivery })(
    AdminDashBoardOrderItems
  )
);
