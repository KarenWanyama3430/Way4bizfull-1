import React from "react";
import { Link } from "react-router-dom";
import "./Market.css";
import Heart from "../Products/Heart";

// import DisplayProduct from "./DisplayProduct";

class DisplayProduct extends React.Component {
  render() {
    const { product } = this.props;
    return (
      <div key={product._id} className="product" ref={this.props.ref}>
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          title={product.name}
          className="product-link"
        >
          <img
            src={
              product.imageUrl[0].includes("http")
                ? product.imageUrl[0]
                : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
            }
            alt={product.name}
          />

          <div style={{ padding: "0px 10px" }}>
            <p className="product-name">{product.name}</p>
            <p style={{ fontWeight: "bolder" }} className="price">
              Ksh.{product.price.toLocaleString()}
            </p>
          </div>
        </Link>
        <div style={{ height: "10px", padding: "0px 10px" }}>
          {product.freeShipping && (
            <p className="lead" style={{ fontSize: "smaller" }}>
              Free Shipping
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 10px",
          }}
          className="my-2"
        >
          <Heart product={product} />
        </div>
      </div>
    );
  }
}

export default DisplayProduct;
