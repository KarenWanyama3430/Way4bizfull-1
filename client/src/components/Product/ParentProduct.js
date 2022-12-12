import React, { Component } from "react";
import { connect } from "react-redux";
import Product from "./Product";
import { fetchSingleProduct, fetchProductReviews } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import ScreenLoader from "../Pages/ScreenLoader";

export class ParentProduct extends Component {
  componentDidMount() {
    this.props.fetchProductReviews(this.props.match.params.productId);
    this.props.fetchSingleProduct(
      this.props.match.params.productId,
      this.props.history
    );
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.match.params.productId !== prevProps.match.params.productId
    ) {
      this.props.fetchSingleProduct(
        this.props.match.params.productId,
        this.props.history
      );
      this.props.fetchProductReviews(this.props.match.params.productId);
    }
  }
  render() {
    if (this.props.singleProductLoad) return <ScreenLoader />;
    return this.props.product && <Product key={this.props.location.key} />;
  }
}
const mapStateToProps = state => {
  return {
    product: state.product.product,
    relatedProducts: state.product.relatedProducts,
    singleProductLoad: state.product.singleProductLoad
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchSingleProduct, fetchProductReviews })(
    ParentProduct
  )
);
