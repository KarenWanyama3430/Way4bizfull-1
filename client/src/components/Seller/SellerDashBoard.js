import React from "react";

import "./SellerDashBoard.css";

import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import { connect } from "react-redux";
import {
  fetchSellerNewOrdersCount,
  fetchUser,
  clearNewSellerDetails,
} from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import { Redirect, Link } from "react-router-dom";

class SellerDashBoard extends React.Component {
  componentDidMount() {
    this.props.fetchSellerNewOrdersCount();
    this.props.fetchUser();
    if (this.props.user && this.props.user.isSeller) {
      this.props.clearNewSellerDetails();
    }
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (!this.props.dashboard) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        {this.props.user && (
          <React.Fragment>
            <SellerDashBoardHeader />
            <div className="row no-gutters">
              <div className="col-lg-3">
                <SellerDashBoardMenu />
              </div>
              <div className="col-lg-9 mx-auto">
                <div className="dashboard-content">
                  <div className="mb-2 container">
                    <div className="row align-items-center">
                      <div className="col-8 pl-0">
                        <h6
                          className="seller-welcome"
                          style={{ paddingLeft: "15px" }}
                        >
                          Welcome {this.props.user.firstName}
                        </h6>
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <h6 className="seller-welcome">
                          <Link to="/points">
                            Points: {this.props.user.points}
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <hr />
                  <div className="container">
                    <div className="row mt-5">
                      <div>
                        <h3 className="my-2" style={{ paddingLeft: "15px" }}>
                          Store Summary
                        </h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="box-container big-number-wrapper">
                          <h1 className="big-number">
                            {this.props.dashboard &&
                              this.props.dashboard.newOrders &&
                              this.props.dashboard.newOrders.toLocaleString()}
                          </h1>
                          <h6>NEW ORDERS</h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box-container big-number-wrapper">
                          <h1 className="big-number">
                            {this.props.dashboard &&
                              this.props.dashboard.monthsSelling &&
                              this.props.dashboard.monthsSelling.toLocaleString()}
                          </h1>
                          <h6>Months</h6>
                          <h6>SELLING ON WAY4BIZ</h6>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div>
                        <h3 className="my-2" style={{ paddingLeft: "15px" }}>
                          Store Performance
                        </h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="box-container big-number-wrapper">
                          <h1 className="big-number">
                            {this.props.dashboard &&
                              this.props.dashboard.successfulSales &&
                              this.props.dashboard.successfulSales.toLocaleString()}
                          </h1>
                          <h6>SUCCESSFUL SALES</h6>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="box-container big-number-wrapper">
                          <h1 className="big-number">
                            {this.props.dashboard &&
                              this.props.dashboard.qualityRating &&
                              this.props.dashboard.qualityRating.toLocaleString()}
                          </h1>
                          <h6>QUALITY RATING</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    dashboard: state.detailsPersist.dashboard,
  };
};
export default connect(mapStateToProps, {
  fetchSellerNewOrdersCount,
  fetchUser,
  clearNewSellerDetails,
})(SellerDashBoard);
