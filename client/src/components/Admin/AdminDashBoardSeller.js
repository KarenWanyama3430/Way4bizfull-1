import React from "react";
import DashBoardHeader from "./AdminDashBoardHeader";
import SecondaryHeader from "./AdminDashboardSecondaryHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import "./AdminDashBoardSeller.css";
import { connect } from "react-redux";
import { fetchVerifiedSeller } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardSeller extends React.Component {
  componentDidMount() {
    this.props.fetchVerifiedSeller(
      this.props.match.params.sellerId,
      this.props.history
    );
  }
  render() {
    if (!this.props.verifiedSeller || this.props.verifiedSellerLoading)
      return <ScreenLoader />;
    if (this.props.verifiedSeller) {
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
                      <Link to="/admin-sellers">
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
                    {this.props.verifiedSeller.firstName}{" "}
                    {this.props.verifiedSeller.lastName}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Store Name: </strong>
                    {this.props.verifiedSeller.storeName}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Business Number: </strong>
                    {this.props.verifiedSeller.businessNumber}
                  </h5>
                </div>

                <div className="custom-row">
                  <h5>
                    <strong>Date Joined: </strong>
                    {new Date(
                      this.props.verifiedSeller.createdAt
                    ).toLocaleString()}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Phone: </strong>
                    +254{this.props.verifiedSeller.phoneNumber}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Email: </strong>
                    {this.props.verifiedSeller.email}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>City: </strong>
                    {this.props.verifiedSeller.city}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Town: </strong>
                    {this.props.verifiedSeller.town}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5>
                    <strong>Address: </strong>
                    {this.props.verifiedSeller.address}
                  </h5>
                </div>
                <div className="custom-row">
                  <h5 className="mb-2">
                    <strong>Store Description</strong>
                  </h5>
                  <p>{this.props.verifiedSeller.description}</p>
                </div>
                <div>
                  <h5 className="mb-2 ">
                    <strong>Seller Documents</strong>
                  </h5>
                  <div className="seller-images">
                    {this.props.verifiedSeller.imageUrl.map((url, i) => (
                      <div key={i}>
                        <img
                          src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url}`}
                          alt={url}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <ScreenLoader />;
  }
}
const mapStateToProps = (state) => {
  return {
    verifiedSeller: state.seller.verifiedSeller,
    verifiedSellerLoading: state.seller.verifiedSellerLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchVerifiedSeller })(AdminDashBoardSeller)
);
