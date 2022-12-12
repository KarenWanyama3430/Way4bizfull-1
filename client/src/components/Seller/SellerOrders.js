import React from "react";
import Tabs from "react-responsive-tabs";
import "./SellerOrders.css";

import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";

import DashBoardOrder from "./DashBoardOrder";
import { fetchSellerOrders } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { Redirect } from "react-router-dom";

class SellerOrders extends React.Component {
  componentDidMount() {
    this.props.fetchSellerOrders();
  }
  getTabs() {
    const newOrders =
      this.props.sellerOrders.length !== 0 &&
      this.props.sellerOrders.filter(
        (order) =>
          !order.delivered &&
          !order.cancelled &&
          (order.items.find((item) => !item.sellerDispatched) ? true : false)
      );
    const delivered =
      this.props.sellerOrders.length !== 0 &&
      this.props.sellerOrders.filter((order) => order.delivered);
    const cancelled =
      this.props.sellerOrders.length !== 0 &&
      this.props.sellerOrders.filter((order) => order.cancelled);
    // const dispatched =
    //   this.props.sellerOrders.length !== 0 &&
    //   this.props.sellerOrders.filter(order => order.dispatched);
    let tabs = [
      {
        title: "All",
        data: <DashBoardOrder sellerOrders={this.props.sellerOrders} />,
      },
      {
        title: "New",
        data: <DashBoardOrder title="New" sellerOrders={newOrders} />,
      },
      // {
      //   title: "Dispatched",
      //   data: <DashBoardOrder sellerOrders={dispatched} />
      // },

      { title: "Delivered", data: <DashBoardOrder sellerOrders={delivered} /> },

      { title: "Cancelled", data: <DashBoardOrder sellerOrders={cancelled} /> },
    ];

    return tabs.map((tab, index) => ({
      title: tab.title,
      getContent: () => tab.data,
      key: index,
      tabClassName: "orders-tab",
      panelClassName: "order-db-panel",
    }));
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (this.props.sellerOrdersLoading) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>

          <div className="col-lg-9">
            <div className="dashboard-content" style={{ overflowX: "hidden" }}>
              <div className="container mx-auto m-0">
                <div className="row">
                  <div className="col">
                    <h3
                      className="seller-orders-title"
                      style={{
                        textAlign: "center",
                        margin: "10px 0px",
                      }}
                    >
                      Orders
                    </h3>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col p-0">
                    <Tabs
                      items={this.getTabs()}
                      transformWidth={767}
                      transform={true}
                      showMoreLabel={"More..."}
                      showInkBar={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sellerOrders: state.seller.sellerOrders,
    sellerOrdersLoading: state.auth.sellerOrdersLoading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { fetchSellerOrders })(SellerOrders);
