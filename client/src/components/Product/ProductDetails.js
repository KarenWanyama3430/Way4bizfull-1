import React from "react";
import "./ProductDetails.css";
class ProductDetails extends React.Component {
  render() {
    return (
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <p
          className="dangerous-stuff"
          dangerouslySetInnerHTML={{ __html: this.props.data }}
        />
      </div>
    );
  }
}

export default ProductDetails;
