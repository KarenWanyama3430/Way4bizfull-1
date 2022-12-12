import React from "react";
import Tabs from "react-responsive-tabs";
import "./SellerPoints.css";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import EarnPoints from "./EarnPoints";
import RedeemPoints from "./RedeemPoints";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SellerPoints extends React.Component {
  getTabs() {
    const data = [
      {
        name: "Earn Points",
        content: <EarnPoints />
      },
      {
        name: "Redeem Points",
        content: <RedeemPoints />
      }
    ];

    return data.map((d, index) => ({
      title: d.name,
      getContent: () => d.content,
      key: index,
      tabClassName: "points-tab",
      panelClassName: "seller-db-panel"
    }));
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9 mt-5">
            <div className="container seller-dashboard-wrapper m-0">
              <div className="row">
                <div className="col-11 col-md-9 mx-auto my-5">
                  <Tabs
                    items={this.getTabs()}
                    transformWidth={100}
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
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
export default connect(mapStateToProps)(SellerPoints);
