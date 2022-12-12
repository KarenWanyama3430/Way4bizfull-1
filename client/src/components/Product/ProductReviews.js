import React from "react";
import Rating from "./Rating";

import "./ProductReviews.css";
import { connect } from "react-redux";
import NoReviews from "./NoReviews";

class ProductReviews extends React.Component {
  render() {
    return (
      <div>
        {/* mapping here */}
        {this.props.productReviews.length !== 0 &&
          this.props.productReviews.map(prod => (
            <div className="buyer-review-wrapper" key={prod._id}>
              <Rating size={15} clickable={false} value={prod.rating} />

              <h5>
                <strong>{prod.title}</strong>
              </h5>
              <p>{prod.body}</p>
              <p className="my-2 lead" style={{ fontSize: "15px" }}>
                By{" "}
                {prod.userSeller
                  ? prod.userSeller.firstName
                  : prod.user.firstName}
                <span className="ml-2">
                  on {new Date(prod.createdAt).toLocaleString()}{" "}
                </span>
              </p>
            </div>
          ))}
        {this.props.productReviews.length === 0 && (
          <h3>
            <NoReviews />
          </h3>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    productReviews: state.product.productReviews
  };
};
export default connect(mapStateToProps)(ProductReviews);
