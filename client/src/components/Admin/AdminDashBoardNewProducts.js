import React from "react";

import "./AdminDashBoardNewProducts.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { fetchUnderReview } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDashBoardNewProducts extends React.Component {
  componentDidMount() {
    this.props.fetchUnderReview();
  }
  render() {
    console.log(this.props.underReview);
    if (!this.props.underReview) return <ScreenLoader />;
    return (
      <div className="container-fluid p-0">
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="container box-container mt-4">
          {this.props.underReview.length !== 0 && (
            <React.Fragment>
              <h3 className="my-2" style={{ textAlign: "center" }}>
                New Products
              </h3>
              <div className="container my-1">
                <div className="row y">
                  <div className="col-lg-3">
                    <h6>Owner</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Name</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Date Added</h6>
                  </div>
                  <div className="col-lg-3">
                    <h6>Review</h6>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}

          <div className="container">
            {/* mapping here */}
            {this.props.underReview.length !== 0 &&
              this.props.underReview.map(pro => (
                <div
                  key={pro._id}
                  className="row admin-new-product box-container py-2"
                >
                  <div className="col-lg-3">
                    <strong className="x mr-1">Owner:</strong>
                    <p>
                      {pro.seller.firstName} {pro.seller.lastName}
                    </p>
                  </div>
                  <div className="col-lg-3">
                    <strong className="x mr-1">Name:</strong>
                    <p>{pro.name}</p>
                  </div>
                  <div className="col-lg-3">
                    <strong className="x mr-1">Date Added:</strong>
                    <p>{new Date(pro.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="col-lg-3">
                    <Link
                      to={`/admin/new-product/${pro._id}`}
                      className="review-new-product"
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          {/* if no new products */}
          {this.props.underReview.length === 0 && (
            <div className="no-new-products my-2">
              <h6 style={{ textAlign: "center" }}>No new products yet.</h6>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    underReview: state.admin.underReview
  };
};

export default connect(mapStateToProps, { fetchUnderReview })(
  AdminDashBoardNewProducts
);
