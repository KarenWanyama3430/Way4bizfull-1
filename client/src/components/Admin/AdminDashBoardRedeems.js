import React from "react";

import "./AdminDashBoardRedeems.css";
import MobileLogo from "../Header/MobileLogo";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { fetchRedeems, payRedeem } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDashBoardRedeems extends React.Component {
  state = {
    redeemId: null
  };
  componentDidMount() {
    this.props.fetchRedeems();
  }
  render() {
    if (!this.props.redeems) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <MobileLogo />
        <AdminDashBoardHeader />
        <div className="container-fluid p-0">
          <AdminDashboardSecondaryHeader />
          <div className="container box-container mt-3">
            <h3 style={{ textAlign: "center" }} className="my-2">
              Redeems
            </h3>
            <div className="container">
              <div className="row y" style={{ borderLeft: "3px solid #fff" }}>
                <div className="col-md-4">
                  <h6>Seller</h6>
                </div>
                <div className="col-md-3">
                  <h6>Date</h6>
                </div>
                <div className="col-md-3">
                  <h6>Amount</h6>
                </div>
                <div className="col-md-2">{/* <h6>Helloo</h6> */}</div>
              </div>
              {/* mapping here */}
              {this.props.redeems.length !== 0 &&
                this.props.redeems.map(redeem => (
                  <div
                    className="row box-container py-2 redeem-wrapper"
                    style={{ borderLeft: "3px solid #f76b1a" }}
                    key={redeem._id}
                  >
                    <div className="col-md-4">
                      <h6>
                        <strong className="x mr-2">Seller:</strong>
                        <span>
                          <Link
                            to={`/seller/store/${redeem.seller._id}`}
                            className="redeem-seller"
                            title="visit seller store"
                          >
                            {redeem.seller.firstName} {redeem.seller.lastName}
                          </Link>
                        </span>
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <h6>
                        <strong className="x mr-2">Time:</strong>
                        <span>
                          {new Date(redeem.createdAt).toLocaleString()}
                        </span>
                      </h6>
                    </div>
                    <div className="col-md-3">
                      <h6>
                        <strong className="x mr-2">Amount:</strong>
                        <span>{redeem.amount.toLocaleString()}</span>
                      </h6>
                    </div>
                    <div className="col-md-2">
                      <h6>
                        {/* show this if paid is false */}
                        {redeem.paid ? (
                          <button disabled className="redeem-paid-btn btn-md">
                            Paid
                          </button>
                        ) : (
                          <button
                            className="redeem-pay-btn btn-md"
                            onClick={() => {
                              this.setState({ redeemId: redeem._id });
                              this.props.payRedeem(redeem._id);
                            }}
                          >
                            {this.state.redeemId &&
                            this.state.redeemId === redeem._id ? (
                              <React.Fragment>
                                {this.props.payRedeemLoading && (
                                  <span
                                    className="spinner-grow spinner-grow-sm"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                )}
                                {this.props.payRedeemLoading ? (
                                  <span> {"  "}Loading...</span>
                                ) : (
                                  <span>Pay</span>
                                )}
                              </React.Fragment>
                            ) : (
                              "Pay"
                            )}
                          </button>
                        )}
                        {/* show this if paid is true */}
                      </h6>
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
    redeems: state.admin.redeems,
    payRedeemLoading: state.admin.payRedeemLoading
  };
};
export default connect(mapStateToProps, { fetchRedeems, payRedeem })(
  AdminDashBoardRedeems
);
