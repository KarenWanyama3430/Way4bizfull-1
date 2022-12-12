import React from "react";
import "./PendingReviews.css";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { IconContext } from "react-icons";
import { MdRateReview } from "react-icons/md";
import { fetchPendingReviews } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class PendingReviews extends React.Component {
  componentDidMount() {
    this.props.fetchPendingReviews();
  }
  render() {
    if (this.props.pendingReviewsLoading) return <ScreenLoader />;
    let test;
    if (this.props.pendingReviewProducts) {
      test = this.props.pendingReviewProducts
        .map((product) => {
          product.productData = product.productData.map((data) => ({
            ...data,
            orderId: product._id,
          }));

          return product.productData;
        })
        .reduce((acc, cur) => acc.concat(cur), [])
        .filter(
          (item, i, arr) =>
            i === arr.findIndex((item2) => item2._id === item._id)
        );
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
                {/* show if no pending reviews */}
                {this.props.pendingReviewProducts.length === 0 && (
                  <div className="container-fluid buyer-no-pending-reviews">
                    <IconContext.Provider
                      value={{ className: "no-reviews-icon" }}
                    >
                      <MdRateReview />
                    </IconContext.Provider>
                    <p className="mt-3">
                      You have no orders with pending reviews yet. Orders
                      delivered to you will appear here for you to review and
                      rate them
                    </p>
                    <Link
                      to="/"
                      className="btn btn-md mt-3 pending-review-shopping-btn"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                )}
                {/* show if there is pending reviews */}
                {this.props.pendingReviewProducts.length !== 0 && (
                  <div className="container-fluid p-0 buyer-pending-reviews">
                    <h4 className="my-3">Pending Reviews</h4>
                    <div className="buyer-pending-reviews-wrapper mt-2 container">
                      {/* mapping takes place here */}
                      {test.map((item) => (
                        <div
                          key={item._id}
                          className="buyer-pending-review box-container row"
                        >
                          <div className="col-md-10">
                            <img
                              src={
                                item.imageUrl[0].includes("http")
                                  ? item.imageUrl[0]
                                  : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.imageUrl[0]} `
                              }
                              alt={item.name}
                            />
                            <div id="buyer-review-product-details">
                              <div className="mb-3">
                                <h6>{item.name}</h6>
                              </div>

                              <p>Ksh.{item.price.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="col-md-2 rate-link-wrapper">
                            <Link
                              to={`/add/review/${item._id}/${item.orderId}`}
                              className="pending-review-rate-link"
                            >
                              Rate
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
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
    pendingReviewProducts: state.product.pendingReviewProducts,
    pendingReviewsLoading: state.auth.pendingReviewsLoading,
  };
};
export default connect(mapStateToProps, { fetchPendingReviews })(
  PendingReviews
);
