import React, { Component } from "react";
import { connect } from "react-redux";
import { singleCategory, revertFilter, setUrl } from "../../redux/actions";
import { withRouter } from "react-router-dom";
import Products from "./Products";
import ScreenLoader from "../Pages/ScreenLoader";

export class ProductParent extends Component {
  state = {};
  componentDidMount() {
    this.props.singleCategory(
      this.props.match.params.category,
      this.props.filter,
      this.props.history
    );
    this.props.setUrl(this.props.history.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.category !== nextProps.match.params.category) {
      this.props.revertFilter(
        nextProps.match.params.category,
        this.props.filter,
        this.props.history
      );
    }
  }
  componentWillUnmount() {
    this.props.revertFilter(
      this.props.match.params.category,
      this.props.filter,
      this.props.history
    );
  }
  render() {
    if (this.props.singleCategoryLoading) return <ScreenLoader />;
    return (
      <React.Fragment>
        {this.props.categoryProductCount !== null && (
          <Products
            length={this.props.singleCategoryProducts.length}
            key={this.props.location.key}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    categoryProductCount: state.product.categoryProductCount,
    singleCategoryProducts: state.product.singleCategoryProducts,
    singleCategoryLoading: state.auth.singleCategoryLoading,
    filter: state.filter
  };
};
export default withRouter(
  connect(mapStateToProps, { singleCategory, revertFilter, setUrl })(
    ProductParent
  )
);
