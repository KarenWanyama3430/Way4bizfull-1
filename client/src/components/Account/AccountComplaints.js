import React from "react";
import "./AccountComplaints.css";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { Link } from "react-router-dom";
import { fetchBuyerComplaints } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { BsExclamationCircle } from "react-icons/bs";
import MobileLogo from "../Header/MobileLogo";

class AccountComplaints extends React.Component {
  componentDidMount() {
    this.props.fetchBuyerComplaints();
  }
  render() {
    if (!this.props.buyerComplaints) return <ScreenLoader />;
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
                {this.props.buyerComplaints.length !== 0 ? (
                  <React.Fragment>
                    {" "}
                    <div className="container mb-3">
                      <h3 className="mt-2" style={{ textAlign: "center" }}>
                        Complaints
                      </h3>
                    </div>
                    <div className="container y">
                      <div className="row">
                        <div className="col-md-5">
                          <h6>Product</h6>
                        </div>
                        <div className="col-md-4">
                          <h6>Store Name</h6>
                        </div>
                        <div className="col-md-3"></div>
                      </div>
                    </div>
                    <div className="container">
                      {/* mapping here */}
                      {this.props.buyerComplaints.length !== 0 &&
                        this.props.buyerComplaints.map((c) => (
                          <div
                            key={c._id}
                            className="row box-container account-complaint-wrapper"
                          >
                            <div className="col-md-5">
                              <p>
                                <strong className="mr-2 x">Product: </strong>
                                <span>{c.productName}</span>
                              </p>
                            </div>
                            <div className="col-md-4">
                              <p>
                                <strong className="mr-2 x">Store Name:</strong>
                                <span>{c.storeName}</span>
                              </p>
                            </div>
                            <div className="col-md-3">
                              <p>
                                <Link
                                  to={`/complaint/${c._id}`}
                                  className="account-complaint-view-more"
                                >
                                  View More
                                </Link>
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="no-buyer-complaints">
                    <BsExclamationCircle
                      style={{ fontSize: "100px", color: "#f76b1a" }}
                    />
                    <h5 className="mt-3">No complaints filed yet.</h5>
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
    buyerComplaints: state.product.buyerComplaints,
  };
};
export default connect(mapStateToProps, { fetchBuyerComplaints })(
  AccountComplaints
);
