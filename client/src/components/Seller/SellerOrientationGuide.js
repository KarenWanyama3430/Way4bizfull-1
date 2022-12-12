import React from "react";
import { animateScroll as scroll } from "react-scroll";

import "./SellerOrientationGuide.css";

class SellerOrientationGuide extends React.Component {
  componentDidMount() {
    this.props.proceed(false);
    scroll.scrollToTop();
  }

  handleClick = (e) => {
    this.props.proceed(true);
  };
  render() {
    return (
      <div className="container">
        <div style={{ textAlign: "center" }} id="seller-orientation-guide-wrapper">
          <h5 className="mb-5">Please read the seller orientation guide.</h5>
          <a
            className="my-2 btn btn-lg"
            href="/1.jpg"
            download
            id="download-guide-link"
            onClick={this.handleClick}
          >
            Download PDF
          </a>
        </div>
      </div>
    );
  }
}

export default SellerOrientationGuide;
