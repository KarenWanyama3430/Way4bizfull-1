import React from "react";

import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashBoardSecondaryHeader from "./AdminDashboardSecondaryHeader";

import "./AdminDashBoardComplaint.css";
import { Link, withRouter } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import { fetchComplaint } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import Image from "../Market/Image";

class AdminDashBoardComplaints extends React.Component {
  componentDidMount() {
    this.props.fetchComplaint(
      this.props.match.params.complaintId,
      this.props.history
    );
  }
  render() {
    if (!this.props.complaint || this.props.complaintLoading)
      return <ScreenLoader />;
    if (Object.keys(this.props.complaint).length !== 0) {
      const {
        buyerFirstName,
        buyerLastName,
        sellerFirstName,
        sellerLastName,
        buyerPhoneNumber,
        sellerPhoneNumber,
        sellerEmail,
        sellerId,
        productName,
        productPrice,
        imageUrl,
        quantityOrdered,
        body
      } = this.props.complaint;
      return (
        <div className="container-fluid p-0 mb-5">
          <AdminDashBoardHeader />
          <AdminDashBoardSecondaryHeader />
          <div className="container box-container mt-4">
            <div className="d-flex align-items-center">
              <div style={{ flex: "1" }}>
                <IconContext.Provider
                  value={{ className: "arrow-icon ml-3 my-2" }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => this.props.history.goBack()}
                    >
                      <BsArrowLeft />
                    </div>
                  </div>
                </IconContext.Provider>
              </div>
              <h3 className="mt-3 mb-2" style={{ flex: "1" }}>
                Complaints
              </h3>
            </div>
            <div className="box-container p-2 admin-complain">
              <div className="container">
                <h4 className="my-1">Buyer</h4>
                <div className="row box-container p-2 m-0">
                  <div className="col-md-6 p-0">
                    <h6>
                      <strong className="mr-1">Name:</strong>
                      {buyerFirstName} {buyerLastName}{" "}
                    </h6>
                  </div>
                  <div className="col-md-6 p-0">
                    <h6>
                      <strong className="mr-1">Phone:</strong>+254
                      {buyerPhoneNumber}
                    </h6>
                  </div>
                </div>
                <div>
                  <h4 className="mt-3 mb-1">Complaint</h4>
                  <div className="box-container p-2">
                    <p style={{ fontSize: "17px" }}>{body}</p>
                  </div>
                </div>
                <h4 className="my-1">Seller</h4>
                <div className="box-container p-2">
                  <h6 className="my-1">
                    <strong className="mr-2">Name:</strong>
                    {sellerFirstName} {sellerLastName}
                  </h6>
                  <h6 className="my-1">
                    <strong className="mr-2">Phone:</strong>+254
                    {sellerPhoneNumber}
                  </h6>
                  <h6 className="my-1">
                    <strong className="mr-2">Email:</strong>
                    {sellerEmail}
                  </h6>
                  <h6>
                    <Link
                      to={`/seller/store/${sellerId}`}
                      style={{ color: "#f76b1a" }}
                    >
                      View Store
                    </Link>
                  </h6>
                </div>
                <div>
                  <h4 className="my-1">Product Details</h4>
                  <div className="box-container">
                    <div className="row m-0 ">
                      <div className="col-md-6">
                        <h6 className="my-1">
                          <strong className="mr-2">Name:</strong>
                          {productName}
                        </h6>
                        <h6 className="my-1">
                          <strong className="mr-2">Unit Price:</strong>ksh.
                          {productPrice.toLocaleString()}
                        </h6>
                      </div>
                      <div className="col-md-6">
                        <h6 className="my-1">
                          <strong className="mr-2">Quantity Ordered:</strong>
                          {quantityOrdered}
                        </h6>
                        <h6 className="my-1">
                          <strong className="mr-2">Total Price:</strong>
                          ksh.
                          {(productPrice * quantityOrdered).toLocaleString()}
                        </h6>
                      </div>
                    </div>
                    {/* <h4 className="my-1 ml-2">Images</h4> */}
                    <div className="complain-product-images mt-3">
                      {imageUrl.map((url, index) => (
                        <div key={index}>
                          <Image
                            image={
                              url.includes("http")
                                ? url
                                : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url} `
                            }
                            alt={url}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* mapping ends here */}
            {/* if no complains */}
          </div>
        </div>
      );
    }
    return (
      <div className="admin-no-complains">
        <h4>No complaints yet.</h4>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    complaint: state.product.complaint,
    complaintLoading: state.product.complaintLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchComplaint })(AdminDashBoardComplaints)
);
