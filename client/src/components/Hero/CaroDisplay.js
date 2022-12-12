import React from "react";

import "./CaroDisplay.css";
import Carousel from "./Carousel";
import { connect } from "react-redux";

class CaroDisplay extends React.Component {
  render() {
    return (
      <div id="caro-display" className="col-lg-9 pr-0">
        {this.props.products.length !== 0 && (
          <Carousel key={this.props.heroImages} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products,
    heroImages: state.product.heroImages
  };
};
export default connect(mapStateToProps)(CaroDisplay);
