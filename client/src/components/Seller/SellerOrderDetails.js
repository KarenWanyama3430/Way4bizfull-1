import React from "react";

import "./SellerOrderDetails.css";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { confirmDispatch } from "../../redux/actions";

class SellerOrderDetails extends React.Component {
  render() {
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-md-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9">
            <div className="container-fluid seller-db-order-details-wrapper">
              <div className="row align-items-center">
                <IconContext.Provider
                  value={{ className: "arrow-icon ml-3 my-2" }}
                >
                  <div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => this.props.history.goBack()}
                    >
                      <BsArrowLeft />
                    </div>
                  </div>
                </IconContext.Provider>
                <h3 className="ml-2">Ordered Items</h3>
              </div>
              <div className="row y my-2">
                <h6 className="col-lg-5">Item</h6>
                <h6 className="col-lg-2">Quantity</h6>
                <h6 className="col-lg-2">Amount</h6>
                <h6 className="col-lg-3">Buyer Destination</h6>
              </div>
              <div className="container-fluid seller-orders-wrapper">
                {/* mapping here */}
                {this.props.sellerOrderDetails &&
                  this.props.sellerOrderDetails.productSellerData &&
                  this.props.sellerOrderDetails.productSellerData.length !==
                    0 &&
                  this.props.sellerOrderDetails.productSellerData.map(data => (
                    <div
                      className="row box-container seller-order-wrapper"
                      key={data._id}
                    >
                      <div className="col-md-6 col-lg-5 d-flex align-items-center">
                        <img
                          height="100px"
                          src={
                            data.imageUrl[0].includes("http")
                              ? data.imageUrl[0]
                              : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${data.imageUrl[0]} `
                          }
                          alt={data.name}
                        />
                        <p>
                          <strong>{data.name}</strong>
                        </p>
                      </div>
                      <div className="col-md-6 col-lg-2">
                        <p>
                          <strong className="x mr-2">Qty:</strong>
                          {this.props.sellerOrderDetails.items.map(item => {
                            const prodExist = data._id === item.product;
                            if (prodExist) {
                              return item.quantity;
                            }
                            return null;
                          })}
                        </p>
                      </div>
                      <div className="col-md-6 col-lg-2">
                        <p>
                          <strong className="mr-2 x">Amount:</strong>ksh.
                          {data.price.toLocaleString()}
                        </p>
                      </div>
                      <div className="col-md-6 col-lg-3">
                        <p id="buyer-destination">
                          <strong className="mr-2 x">Destination:</strong>
                          {this.props.sellerOrderDetails.buyer.length !== 0 &&
                            `${this.props.sellerOrderDetails.buyer[0].address}/${this.props.sellerOrderDetails.buyer[0].town}/${this.props.sellerOrderDetails.buyer[0].city}`}
                        </p>
                      </div>
                    </div>
                  ))}
                {!this.props.sellerOrderDetails.cancelled &&
                  !this.props.sellerOrderDetails.delivered &&
                  !this.props.sellerOrderDetails.dispatched && (
                    <div
                      className="container-fluid d-flex  mt-4 justify-content-center"
                      style={{ height: "30px" }}
                    >
                      <button
                        className="btn btn-lg confirm-dispatch-btn"
                        onClick={() =>
                          this.props.confirmDispatch(
                            this.props.sellerOrderDetails.orderId,
                            this.props.sellerOrderDetails.productSellerData.map(
                              item => item._id
                            ),
                            this.props.history
                          )
                        }
                      >
                        {this.props.dispatchLoading && (
                          <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        {this.props.dispatchLoading ? (
                          <span> {"  "}Loading...</span>
                        ) : (
                          <span>Confirm Dispatch</span>
                        )}
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sellerOrderDetails: state.detailsPersist.sellerOrderDetails,
    dispatchLoading: state.product.dispatchLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { confirmDispatch })(SellerOrderDetails)
);
