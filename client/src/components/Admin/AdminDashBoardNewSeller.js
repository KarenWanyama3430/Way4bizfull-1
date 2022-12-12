import React from "react";

import "./AdminDashBoardNewSeller.css";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter, Redirect } from "react-router-dom";
import { fetchNewSeller, acceptSellerRequest } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class AdminDashBoardSeller extends React.Component {
  componentDidMount() {
    this.props.fetchNewSeller(
      this.props.match.params.sellerId,
      this.props.history
    );
  }
  render() {
    if (this.props.newSellerLoading) return <ScreenLoader />;
    if (!this.props.newSeller) return <ScreenLoader />;
    if (this.props.newSeller && Object.keys(this.props.newSeller) !== 0) {
      const {
        firstName,
        lastName,
        storeName,
        createdAt,
        phoneNumber,
        description,
        city,
        town,
        address,
        email,
        businessNumber
      } = this.props.newSeller;
      return (
        <div className="container-fluid p-0 mb-5">
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
                      <Link to="/admin-new-sellers">
                        <BsArrowLeft />
                      </Link>
                    </div>
                  </IconContext.Provider>
                </div>

                <h3 className="ml-1" style={{ flex: "2" }}>
                  Seller Details
                </h3>
              </div>
              <div className="admin-individual-seller-details">
                <div className="custom-row">
                  <h5>
                    <strong>Name: </strong>
                    {firstName} {lastName}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>StoreName: </strong>
                    {storeName}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Business Number: </strong>
                    {businessNumber}
                  </h5>
                </div>

                <div className="custom-row">
                  <h5>
                    <strong>Date Joined: </strong>
                    {new Date(createdAt).toLocaleString()}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Phone: </strong>
                    +254{phoneNumber}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Email: </strong>
                    {email}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>City: </strong>
                    {city}
                  </h5>
                </div>
                {town && (
                  <div className="custom-row">
                    <h5>
                      <strong>Town: </strong>
                      {town}
                    </h5>
                  </div>
                )}
                <div className="custom-row">
                  <h5>
                    <strong>Address: </strong>
                    {address}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5 className="mb-2">
                    <strong>Store Description</strong>
                  </h5>
                  <p>{description}</p>
                </div>

                <div>
                  {this.props.newSeller.imageUrl.length === 0 ? (
                    <h5 style={{ textAlign: "center" }} className="mb-2">
                      <strong>No Documents Uploaded Yet</strong>
                    </h5>
                  ) : (
                    <React.Fragment>
                      <strong>Seller Documents</strong>

                      <div className="seller-images">
                        {this.props.newSeller.imageUrl.map((url, i) => (
                          <div key={i}>
                            <img
                              src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url}`}
                              alt={url}
                            />
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>

              <div className="accept-sell-request">
                <button
                  disabled={this.props.newSeller.imageUrl.length < 2}
                  className="btn btn-block accept-sell-request-btn"
                  onClick={() =>
                    this.props.acceptSellerRequest(
                      this.props.history,
                      this.props.match.params.sellerId
                    )
                  }
                >
                  {this.props.sellerRequestLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {this.props.sellerRequestLoading ? (
                    <span> {"  "}Loading...</span>
                  ) : (
                    <span>Accept Seller Request</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => {
  return {
    newSeller: state.seller.newSeller,
    newSellerLoading: state.seller.newSellerLoading,
    sellerRequestLoading: state.seller.sellerRequestLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchNewSeller, acceptSellerRequest })(
    AdminDashBoardSeller
  )
);
