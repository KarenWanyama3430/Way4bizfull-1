import React from "react";

import "./SellerDashBoardReviews.css";

import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import Rating from "../Product/Rating";
import { IconContext } from "react-icons";
import { BsArrowRight } from "react-icons/bs";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { fetchSellerReviews } from "../../redux/actions";
import { withRouter, Redirect } from "react-router-dom";
import SellerDashBoardNoReviews from "./SellerDashBoardNoReviews";

class Review extends React.Component {
  componentDidMount() {
    this.props.fetchSellerReviews();
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (this.props.sellerReviewsLoading) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9 reviews-wrapper m-0 p-0">
            <div className="dashboard-content">
              <div className="container-fluid  mx-auto box-container m-0">
                {/* mapping here */}
                {this.props.sellerReviews.length === 0 && (
                  <SellerDashBoardNoReviews />
                )}
                {this.props.sellerReviews.length !== 0 &&
                  this.props.sellerReviews.map((review) => (
                    <div className="review-wrapper mb-3" key={review._id}>
                      <Rating clickable={false} size={15} value={4} />
                      <div className="seller-review-product-title-name">
                        <h6 className="my-2">
                          {review.title}{" "}
                          <IconContext.Provider
                            value={{ className: "seller-review-title-arrow" }}
                          >
                            <BsArrowRight />
                          </IconContext.Provider>
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              this.props.history.push(
                                `/product/${review.productData._id}`
                              )
                            }
                            title={review.productData.name}
                          >
                            {review.productData.name}
                          </span>
                        </h6>
                      </div>

                      <p className="">{review.body}</p>
                      <h6 className="my-2">
                        By{" "}
                        {review.user.length !== 0
                          ? review.user[0] && review.user[0].firstName
                          : review.userSeller[0] &&
                            review.userSeller[0].firstName}{" "}
                        on {new Date(review.createdAt).toLocaleString()}{" "}
                      </h6>
                    </div>
                  ))}
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
    sellerReviews: state.product.sellerReviews,
    sellerReviewsLoading: state.product.sellerReviewsLoading,
    user: state.auth.user,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchSellerReviews })(Review)
);
