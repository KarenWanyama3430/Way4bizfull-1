import React, { Component } from "react";
import AccountMenu from "./AccountMenu";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import "./BuyerOrderDetails.css";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { connect } from "react-redux";
import { fetchBuyerOrderDetails, addToCart } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";
import Image from "../Market/Image";
import MobileLogo from "../Header/MobileLogo";

class BuyerOrderDetails extends Component {
  componentDidMount() {
    this.props.fetchBuyerOrderDetails(
      this.props.match.params.orderId,
      this.props.history
    );
  }
  render() {
    const { buyerOrderDetails } = this.props;
    if (this.props.fetchOrdersLoading) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <AccountHeader />
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <AccountMenu />
              </div>
              <div className="col-lg-8 box-container order-details-wrapper">
                {/* <div className="container-fluid">
                  <div className="row">
                    <IconContext.Provider
                      value={{ className: "arrow-icon ml-3 my-2" }}
                    >
                      <div className="d-flex align-items-center">
                        <Link to="/orders">
                          <BsArrowLeft />
                        </Link>
                        <h3 className="ml-3">Order Details</h3>
                      </div>
                    </IconContext.Provider>
                  </div>
                </div> */}
                <div className="d-flex align-items-center">
                  <div style={{ flex: "1" }}>
                    <IconContext.Provider
                      value={{ className: "arrow-icon ml-3 my-2" }}
                    >
                      <div className="d-flex align-items-center">
                        <Link to="/orders">
                          <BsArrowLeft
                            style={{ color: "#f76b1a", fontSize: "35px" }}
                          />
                        </Link>
                      </div>
                    </IconContext.Provider>
                  </div>

                  <h3 className="ml-1" style={{ flex: "2" }}>
                    Order Details
                  </h3>
                </div>
                <div className="container-fluid">
                  <div className="buyer-order-details-info my-2">
                    <div style={{ borderBottom: "1px solid #eee" }}></div>
                    <p className="mt-3">
                      <strong>Order No: </strong>
                      {buyerOrderDetails &&
                        Object.keys(buyerOrderDetails).length !== 0 &&
                        buyerOrderDetails._id}
                    </p>
                    <p>
                      <strong>Items Ordered:</strong>{" "}
                      {buyerOrderDetails &&
                        Object.keys(buyerOrderDetails).length !== 0 &&
                        buyerOrderDetails.items.length}{" "}
                      {buyerOrderDetails &&
                      Object.keys(buyerOrderDetails).length !== 0 &&
                      buyerOrderDetails.items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                    <strong>Placed on: </strong>
                    {buyerOrderDetails &&
                      Object.keys(buyerOrderDetails).length !== 0 &&
                      new Date(buyerOrderDetails.createdAt).toLocaleString()}
                    <p>
                      <strong className="mb-3">Total: </strong>Ksh.
                      {buyerOrderDetails &&
                        Object.keys(buyerOrderDetails).length !== 0 &&
                        buyerOrderDetails.totalPrice.toLocaleString()}
                    </p>
                    {buyerOrderDetails &&
                      Object.keys(buyerOrderDetails).length !== 0 && (
                        <p>
                          <strong className="mr-2">Status:</strong>
                          {(buyerOrderDetails.cancelled && "Cancelled") ||
                            (buyerOrderDetails.delivered && "Delivered") ||
                            (buyerOrderDetails.paid &&
                              !buyerOrderDetails.delivered &&
                              "Pending") ||
                            (!buyerOrderDetails.paid &&
                              !buyerOrderDetails.cancelled &&
                              "Cancelled")}
                        </p>
                      )}
                  </div>
                  <div style={{ borderBottom: "1px solid #eee" }}></div>
                  <div className="container-fluid p-0">
                    <h5 className="my-2" style={{ textTransform: "uppercase" }}>
                      Items in your order
                    </h5>
                  </div>
                  <div className="container-fluid p-0">
                    {/* mapping here */}

                    {buyerOrderDetails &&
                      Object.keys(buyerOrderDetails).length !== 0 &&
                      buyerOrderDetails.items.length !== 0 &&
                      buyerOrderDetails.items.map(item => {
                        return (
                          <div
                            className="buyer-order-detail-wrapper box-container"
                            key={item._id}
                          >
                            <div
                              style={{ borderBottom: "1px solid #eee" }}
                              className="p-3"
                            ></div>

                            <div className="row">
                              <div className="col-lg-6 d-flex align-items-center">
                                <Image
                                  image={
                                    item.product.imageUrl[0].includes("http")
                                      ? item.product.imageUrl[0]
                                      : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.product.imageUrl[0]} `
                                  }
                                  alt={item.product.name}
                                  height="150px"
                                />
                                <p>{item.product.name}</p>
                              </div>
                              <div className="col-lg-6 d-flex flex-column justify-content-center">
                                <p>
                                  <strong>Quantity: </strong>
                                  {item.quantity}
                                </p>
                                <p>
                                  <strong>Total Price: </strong>
                                  {(
                                    item.product.price * item.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div
                              style={{ borderTop: "1px solid #eee" }}
                              className="d-flex justify-content-between p-3"
                            >
                              <span>
                                <Link
                                  className="buy-again-link"
                                  to="/cart"
                                  onClick={() =>
                                    this.props.addToCart(item.product)
                                  }
                                >
                                  Buy Again
                                </Link>
                              </span>
                              {this.props.buyerOrderDetails.delivered && (
                                <span>
                                  <Link
                                    className="file-complain-link"
                                    to={`/buyer/file-complain/${buyerOrderDetails._id}/${item.product._id}`}
                                  >
                                    File Complaint
                                  </Link>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
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
const mapStateToProps = state => {
  return {
    buyerOrderDetails: state.product.buyerOrderDetails,
    fetchOrdersLoading: state.auth.fetchOrdersLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchBuyerOrderDetails, addToCart })(
    BuyerOrderDetails
  )
);
