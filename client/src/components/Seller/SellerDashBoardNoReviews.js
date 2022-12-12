import React from "react";
import { MdRateReview } from "react-icons/md";
import "./SellerDashBoardNoReviews.css";
import { IconContext } from "react-icons/lib";

class SellerDashBoardNoReviews extends React.Component {
  render() {
    return (
      <div className="container seller-dashboard-no-reviews">
        <IconContext.Provider value={{ className: "seller-no-reviews" }}>
          <MdRateReview />
        </IconContext.Provider>
        <h4 className="mt-2">
          Your products have no reviews yet.Reviews of your products will appear
          here.
        </h4>
      </div>
    );
  }
}

export default SellerDashBoardNoReviews;
