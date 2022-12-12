import React from "react";

import "./AdminDashBoardNewSellers.css";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { fetchNewSellers } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDashBoardNewSellers extends React.Component {
  componentDidMount() {
    this.props.fetchNewSellers();
  }
  render() {
    if (!this.props.newSellers) return <ScreenLoader />;
    // if (this.props.newSellers && this.props.newSellers.length !== 0) {
    return (
      <div className="container-fluid p-0 mb-5">
        <DashBoardHeader />
        <SecondaryHeader />
        <div className="container box-container mt-4">
          {this.props.newSellers.sellers.length !== 0 ? (
            <React.Fragment>
              {" "}
              <div className="col">
                <h3 style={{ textAlign: "center" }}>New Sellers</h3>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <div className="row y">
                    <div className="col-md-3">
                      <h6 style={{ paddingLeft: "15px" }}>Seller Name</h6>
                    </div>
                    <div className="col-md-3">
                      <h6>Store Name</h6>
                    </div>
                    <div className="col-md-3">
                      <h6>Date Joined</h6>
                    </div>
                    <div className="col-md-3">
                      <h6>More</h6>
                    </div>
                  </div>
                  {/* mapping here */}
                  {this.props.newSellers.sellers.map(seller => (
                    <div
                      className="admin-new-seller container"
                      key={seller._id}
                    >
                      <div
                        className="row box-container"
                        style={{ padding: "10px 0px" }}
                      >
                        <div className="col-md-3">
                          {/* <div className="admin-seller-name"> */}
                          <p>
                            <strong className="mr-2 x">Name:</strong>
                            {seller.firstName} {seller.lastName}
                          </p>
                          {/* </div> */}
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <p>
                            <strong className="mr-2 x">StoreName:</strong>
                            {seller.storeName}
                          </p>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <p>
                            <strong className="x mr-2">Date Joined</strong>
                            {new Date(seller.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="col-md-3 d-flex align-items-center">
                          <p>
                            <Link
                              to={`/admin-new-seller/${seller._id}`}
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
            </React.Fragment>
          ) : (
            <div className="container p-0">
              <div className="admin-no-new-sellers">
                <h4>No new sellers yet.</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    // }
  }
}
const mapStateToProps = state => {
  return {
    newSellers: state.admin.newSellers
  };
};
export default connect(mapStateToProps, { fetchNewSellers })(
  AdminDashBoardNewSellers
);
