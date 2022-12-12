import React from "react";

import "./AdminDashBoardSellers.css";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { fetchVerifiedSellers } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardSellers extends React.Component {
  componentDidMount() {
    this.props.fetchVerifiedSellers();
  }
  render() {
    if (!this.props.verifiedSellers) return <ScreenLoader />;
    return (
      <div className="container-fluid p-0 mb-5">
        <MobileLogo />
        <DashBoardHeader />
        <SecondaryHeader />
        <div className="container box-container mt-4">
          <div className="col">
            <h3 style={{ textAlign: "center" }}>Sellers</h3>
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
              {this.props.verifiedSellers.length !== 0 &&
                this.props.verifiedSellers.map((seller) => (
                  <div key={seller._id} className="admin-seller container">
                    <div className="row box-container">
                      <div className="col-md-3">
                        {/* <div className="admin-seller-details"> */}
                        <p className="d-flex m-1">
                          <strong className="mr-2 x">Name:</strong>
                          {seller.firstName} {seller.lastName}
                        </p>
                        {/* </div> */}
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p className="d-flex m-1">
                          <strong className="mr-2 x">StoreName:</strong>
                          {seller.storeName}
                        </p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p className="d-flex m-1">
                          <strong className="x mr-2">Date Joined</strong>
                          {new Date(seller.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="col-md-3 d-flex align-items-center">
                        <p className="d-flex m-1">
                          <Link
                            to={`/admin-seller/${seller._id}`}
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
const mapStateToProps = (state) => {
  return {
    verifiedSellers: state.seller.verifiedSellers,
    fetchSellersLoading: state.seller.fetchSellersLoading,
  };
};
export default connect(mapStateToProps, { fetchVerifiedSellers })(
  AdminDashBoardSellers
);
