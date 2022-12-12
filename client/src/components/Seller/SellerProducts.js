import React from "react";
import Tabs from "react-responsive-tabs";

import "./SellerProducts.css";

import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import { fetchSellerProducts } from "../../redux/actions";
import DashBoardProduct from "./DashBoardProduct";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { Redirect } from "react-router-dom";

class SellerProducts extends React.Component {
  componentDidMount() {
    this.props.fetchSellerProducts();
  }

  getTabs() {
    const soldOut =
      this.props.sellerProducts &&
      this.props.sellerProducts.length !== 0 &&
      this.props.sellerProducts.filter((pro) => pro.stockQuantity < 1);
    const onSite =
      this.props.sellerProducts &&
      this.props.sellerProducts.length !== 0 &&
      this.props.sellerProducts.filter((pro) => pro.onSite);
    const underReview =
      this.props.sellerProducts &&
      this.props.sellerProducts.length !== 0 &&
      this.props.sellerProducts.filter((pro) => pro.underReview);
    const rejected =
      this.props.sellerProducts &&
      this.props.sellerProducts.length !== 0 &&
      this.props.sellerProducts.filter((pro) => pro.rejected);
    let tabs = [
      {
        title: "Total Products",
        data: (
          <DashBoardProduct
            products={this.props.sellerProducts}
            category="total"
          />
        ),
      },
      {
        title: "Live On Site",
        data: <DashBoardProduct products={onSite} category="live" />,
      },
      {
        title: "Under Review",
        data: <DashBoardProduct products={underReview} category="review" />,
      },
      {
        title: "Rejected",
        data: <DashBoardProduct products={rejected} category="rejected" />,
      },
      {
        title: "Sold Out",
        data: <DashBoardProduct products={soldOut} category="sold-out" />,
      },
    ];

    return tabs.map((tab, index) => ({
      title: tab.title,
      getContent: () => tab.data,
      key: index,
      tabClassName: "products-tab",
      panelClassName: "seller-db-panel",
    }));
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (this.props.sellerProductsLoading) return <ScreenLoader />;
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
                      style={{ textAlign: "center", margin: "10px 0px" }}
                    >
                      Products
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 p-0">
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
    sellerProducts: state.seller.sellerProducts,
    sellerProductsLoading: state.auth.sellerProductsLoading,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { fetchSellerProducts })(
  SellerProducts
);
