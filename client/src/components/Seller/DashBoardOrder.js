import React from "react";
import { Link } from "react-router-dom";

import "./DashBoardOrder.css";
import { fetchSellerOrderDetails } from "../../redux/actions";
import { connect } from "react-redux";
import BuyerDestination from "./BuyerDestination";

class DashBoardOrder extends React.Component {
  render() {
    return (
      <div
        className="container m-0 mx-auto"
        style={{
          backgroundColor: "#fff",
        }}
      >
        <div className="row no-gutters y">
          <div className="col d-flex mb-2">
            <h6 className="col-md-4 p-0" style={{ textAlign: "left" }}>
              Order Info
            </h6>
            <h6 className="col-md-2 p-0">Items No.</h6>
            <h6 className="col-md-2 p-0">Destination</h6>
            <h6 className="col-md-2 p-0">Total Amount</h6>
            <h6 className="col-md-2 p-0">Status</h6>
          </div>
        </div>
        <div className="container-fluid p-0">
          {this.props.sellerOrders && this.props.sellerOrders.length !== 0 ? (
            this.props.sellerOrders.map((order) => (
              <React.Fragment key={order._id}>
                <div className="row dashboard-order-wrapper box-container no-gutters">
                  <div className="col-md-4">
                    <div className="id-cut">
                      <strong className="mr-2">ID:</strong>
                      {order._id}
                    </div>
                    <div>
                      <strong className="mr-2">Date:</strong>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div>
                      <strong className="x mr-2">Qty:</strong>
                      {order.items.length}
                    </div>
                    <div className="view-order-details-link">
                      <Link
                        to={`/order/details/${order._id}`}
                        onClick={() =>
                          this.props.fetchSellerOrderDetails({
                            items: order.items,
                            productSellerData: order.productSellerData,
                            cancelled: order.cancelled,
                            delivered: order.delivered,
                            dispatched: order.dispatched,
                            orderId: order._id,
                            buyer:
                              order.buyerSeller.length !== 0
                                ? order.buyerSeller
                                : order.buyerUser,
                          })
                        }
                      >
                        View Items
                      </Link>
                    </div>
                  </div>

                  <div className="col-md-2">
                    {order.buyerSeller.length !== 0 && order.buyerSeller[0] && (
                      <BuyerDestination
                        buyerId={order.buyer}
                        buyer={order.buyerSeller[0]}
                      />
                    )}
                    {order.buyerUser.length !== 0 && order.buyerUser[0] && (
                      <BuyerDestination
                        buyerId={order.buyer}
                        buyer={order.buyerUser[0]}
                      />
                    )}
                  </div>
                  <div className="col-md-2">
                    <div>
                      <strong className="x mr-2">Amount:</strong>
                      Ksh.
                      {order.productSellerData
                        .map((prod) => {
                          const matchingProd = order.items.find(
                            (item) => item.product === prod._id
                          );
                          if (matchingProd) {
                            return prod.price * matchingProd.quantity;
                          }
                          return null;
                        })
                        .reduce((acc, curr) => acc + curr, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div>
                      <strong className="x mr-2">Status:</strong>
                      {(order.cancelled && "Cancelled") ||
                        (order.delivered && "Delivered") ||
                        (!order.cancelled && !order.delivered && "Pending")}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div style={{ width: "100%" }}>
              You currently don't have any orders yet.
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { fetchSellerOrderDetails })(DashBoardOrder);
