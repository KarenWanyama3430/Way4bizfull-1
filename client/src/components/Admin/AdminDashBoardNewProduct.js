import React from "react";

import "./AdminDashBoardNewProduct.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link, withRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import {
  fetchReviewProduct,
  acceptProduct,
  rejectProduct
} from "../../redux/actions";
import Image from "../Market/Image";

class AdminDashBoardNewProduct extends React.Component {
  componentDidMount() {
    this.props.fetchReviewProduct(
      this.props.match.params.productId,
      this.props.history
    );
  }
  render() {
    if (!this.props.reviewProduct || this.props.fetchReviewProductLoading)
      return <ScreenLoader />;
    return (
      <div className="container-fluid p-0">
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="container box-container mt-4">
          <div className="d-flex align-items-center">
            <div style={{ flex: "1" }}>
              <IconContext.Provider
                value={{ className: "arrow-icon ml-3 my-2" }}
              >
                <div className="d-flex align-items-center">
                  <Link to="/admin/new-products">
                    <BsArrowLeft />
                  </Link>
                </div>
              </IconContext.Provider>
            </div>

            <h3 className="ml-1" style={{ flex: "2" }}>
              Product Details
            </h3>
          </div>

          <div className="admin-new-product-details mt-3">
            <div className="custom-row">
              <h6>
                <strong>Owner: </strong>
                {this.props.reviewProduct.seller.firstName}{" "}
                {this.props.reviewProduct.seller.lastName}
              </h6>
            </div>
            <div className="custom-row">
              <h6>
                <strong>Contact: </strong>+245
                {this.props.reviewProduct.seller.phoneNumber}
              </h6>
            </div>
            <div className="custom-row">
              <h6>
                <strong>Email: </strong>
                {this.props.reviewProduct.seller.email}
              </h6>
            </div>
            <div className="custom-row">
              <h6>
                <strong>Store Name: </strong>
                {this.props.reviewProduct.seller.storeName}
              </h6>
            </div>
            <div className="custom-row">
              <h6>
                <strong>Product Name: </strong>
                {this.props.reviewProduct.name}
              </h6>
            </div>
            <div className="custom-row">
              <h6>
                <strong>Quantity: </strong>
                {this.props.reviewProduct.stockQuantity}
              </h6>
            </div>
            <div className="admin-new-product-images">
              {this.props.reviewProduct.imageUrl.map((url, i) => (
                <Image
                  width="500vw"
                  height="350vh"
                  image={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url}`}
                  key={i}
                  alt={url}
                />
              ))}
            </div>
          </div>
          <div className="admin-new-product-buttons my-2">
            <div
              onClick={() =>
                this.props.acceptProduct(
                  this.props.reviewProduct._id,
                  this.props.history
                )
              }
              className="btn btn-lg accept-product-btn"
            >
              {this.props.acceptProductLoading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {this.props.acceptProductLoading ? (
                <span> {"  "}Loading...</span>
              ) : (
                <span>Accept Product</span>
              )}
            </div>
            <div id="dummy-space" className="y"></div>
            <div
              onClick={() =>
                this.props.rejectProduct(
                  this.props.reviewProduct._id,
                  this.props.history
                )
              }
              className="btn btn-lg reject-product-btn"
            >
              {this.props.rejectProductLoading && (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              {this.props.rejectProductLoading ? (
                <span> {"  "}Loading...</span>
              ) : (
                <span>Reject Product</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    reviewProduct: state.product.reviewProduct,
    acceptProductLoading: state.product.acceptProductLoading,
    rejectProductLoading: state.product.rejectProductLoading,
    fetchReviewProductLoading: state.product.fetchReviewProductLoading
  };
};
export default withRouter(
  connect(mapStateToProps, {
    fetchReviewProduct,
    acceptProduct,
    rejectProduct
  })(AdminDashBoardNewProduct)
);
