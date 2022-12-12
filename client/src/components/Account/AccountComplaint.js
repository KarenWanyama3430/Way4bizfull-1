import React from "react";
import "./AccountComplaint.css";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import { fetchBuyerComplaint } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import Image from "../Market/Image";
import MobileLogo from "../Header/MobileLogo";

class AccountComplaint extends React.Component {
  componentDidMount() {
    this.props.fetchBuyerComplaint(
      this.props.match.params.complaintId,
      this.props.history
    );
  }
  render() {
    if (!this.props.buyerComplaint || this.props.buyerComplaintLoading)
      return <ScreenLoader />;
    if (Object.keys(this.props.buyerComplaint).length !== 0) {
      const {
        storeName,
        body,
        productName,
        productPrice,
        quantityOrdered,
        imageUrl,
        sellerId,
      } = this.props.buyerComplaint;

      return (
        <div className="main">
          <div className="content">
            <MobileLogo />
            <AccountHeader />
            <div className="container pending-reviews-wrapper">
              <div className="row">
                <div className="col-lg-4">
                  <AccountMenu />
                </div>
                <div className="col-lg-8  box-container">
                  <div className="d-flex align-items-center">
                    <div style={{ flex: "1" }}>
                      <IconContext.Provider
                        value={{ className: "arrow-icon ml-3 my-2" }}
                      >
                        <div
                          onClick={() => this.props.history.goBack()}
                          className="d-flex align-items-center"
                        >
                          <div style={{ cursor: "pointer" }}>
                            <BsArrowLeft />
                          </div>
                        </div>
                      </IconContext.Provider>
                    </div>

                    <h3 className="ml-1" style={{ flex: "2" }}>
                      Complaint
                    </h3>
                  </div>

                  <div className="box-container p-2 account-complain">
                    <div className="container">
                      <h4 className="my-1">Store</h4>
                      <div className="row box-container p-2 m-0">
                        <div className="col-md-6 my-1 p-0">
                          <h6>
                            <strong className="mr-1">Name:</strong>
                            {storeName}
                          </h6>
                        </div>

                        <div className="col-md-6 my-1 p-0">
                          <h6>
                            <Link
                              to={`/seller/store/${sellerId}`}
                              className="account-visit-store"
                            >
                              Visit Store
                            </Link>
                          </h6>
                        </div>
                      </div>
                      <div>
                        <h4 className="mt-3 mb-1">Complaint</h4>
                        <div className="box-container p-2">
                          <p style={{ fontSize: "17px" }}>{body}</p>
                        </div>
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
                                <strong className="mr-2">Unit Price:</strong>
                                ksh.{productPrice.toLocaleString()}
                              </h6>
                            </div>
                            <div className="col-md-6">
                              <h6 className="my-1">
                                <strong className="mr-2">
                                  Quantity Ordered:
                                </strong>
                                {quantityOrdered}
                              </h6>
                              <h6 className="my-1">
                                <strong className="mr-2">Total Price:</strong>
                                ksh.
                                {(
                                  quantityOrdered * productPrice
                                ).toLocaleString()}
                              </h6>
                            </div>
                          </div>
                          <div className="account-complain-product-images mt-3">
                            {imageUrl.map((url, i) => (
                              <div key={i}>
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
                </div>
              </div>
            </div>
          </div>
          <Footer />
          <MiniMenuWrapper />
        </div>
      );
    }
  }
  // return <Redirect to="/" />;
}
const mapStateToProps = (state) => {
  return {
    buyerComplaint: state.product.buyerComplaint,
    buyerComplaintLoading: state.product.buyerComplaintLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchBuyerComplaint })(AccountComplaint)
);
