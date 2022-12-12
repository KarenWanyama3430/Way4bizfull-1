import React from "react";
import "./AccountLogistics.css";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { RiMotorbikeLine } from "react-icons/ri";
import MobileLogo from "../Header/MobileLogo";
import { fetchClientDeliveries } from "../../redux/actions";
import ScreenLoader from "../Pages/ScreenLoader";

class AccountLogistics extends React.Component {
  componentDidMount() {
    this.props.fetchClientDeliveries();
  }
  render() {
    if (!this.props.deliveries) {
      return <ScreenLoader />;
    }
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
                {/* deliveries */}
                <React.Fragment>
                  {" "}
                  <div className="container mb-3">
                    <h3 className="mt-2" style={{ textAlign: "center" }}>
                      Logistics Services
                    </h3>
                  </div>
                  {this.props.deliveries && this.props.deliveries.length !== 0 && (
                    <div className="container y">
                      <div className="row">
                        <div className="col-md-3">
                          <h6>Item</h6>
                        </div>
                        <div className="col-md-3">
                          <h6>Delivered From</h6>
                        </div>
                        <div className="col-md-3">
                          <h6>Delivered To</h6>
                        </div>
                        <div className="col-md-3"></div>
                      </div>
                    </div>
                  )}
                  <div className="container">
                    {/* mapping here */}
                    {this.props.deliveries &&
                      this.props.deliveries.length !== 0 &&
                      this.props.deliveries.map((del) => {
                        let user;
                        if (del.user) {
                          user = del.user;
                        }
                        if (del.userSeller) {
                          user = del.userSeller;
                        }
                        return (
                          <div
                            key={del._id}
                            className="row box-container account-complaint-wrapper"
                          >
                            <div className="col-md-3">
                              <p>
                                <strong className="mr-2 x">Item: </strong>
                                <span>{del.itemName}</span>
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p>
                                <strong className="mr-2 x">
                                  Delivered From:{" "}
                                </strong>
                                <span>{user.address}</span>
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p>
                                <strong className="mr-2 x">
                                  Delivered To:
                                </strong>
                                <span>{del.receiverAddress}</span>
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p>
                                <Link
                                  to={`/logistic/${del._id}`}
                                  className="account-complaint-view-more"
                                >
                                  View More
                                </Link>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </React.Fragment>
                {/* No deliveries */}
                {this.props.deliveries.length === 0 && (
                  <div className="no-account-deliveries">
                    <RiMotorbikeLine
                      style={{ fontSize: "100px", color: "#f76b1a" }}
                    />
                    <p className="mt-3">
                      You haven't requested any delivery service yet.You have an
                      item to be delivered from point A to point B ? Click the
                      Get Started button.
                    </p>
                    <Link
                      to="/logistics"
                      className="btn d-flex align-items-center justify-content-center secondary-button"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
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
const mapStateToProps = (state) => {
  return {
    deliveries: state.user.deliveries,
  };
};
export default connect(mapStateToProps, { fetchClientDeliveries })(
  AccountLogistics
);
