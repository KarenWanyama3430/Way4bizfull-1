import React from "react";
import { Link } from "react-router-dom";

import "./DashBoardProduct.css";
import Image from "../Market/Image";

class DashBoardProduct extends React.Component {
  state = {
    search: null,
  };
  onSearchChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const test =
      this.props.products &&
      this.props.products.length !== 0 &&
      this.props.products.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(this.state.search && this.state.search.toLowerCase());
      });
    return (
      <div className="container m-0" style={{ backgroundColor: "white" }}>
        <div className="row no-gutters y">
          <div className="col d-flex mb-2">
            <h6 className="col-md-5 p-0" style={{ textAlign: "left" }}>
              Item
            </h6>
            <h6 className="col-md-2 p-0">Quantity</h6>
            <h6 className="col-md-2 p-0">Price</h6>
            <h6 className="col-md-2 p-0">Status</h6>
            <h6 className="col-md-1 p-0"> </h6>
          </div>
        </div>
        <div className="container-fluid p-0">
          <div className="form-group ">
            <input
              type="text"
              placeholder="Search product..."
              className="mt-2 mb-3 form-control search-2"
              name="search"
              onChange={this.onSearchChange}
            />
          </div>

          {this.props.products &&
          !this.state.search &&
          this.props.products.length !== 0 ? (
            this.props.products.map((product) => (
              <div
                key={product._id}
                className="row no-gutters dashboard-product-wrapper box-container"
              >
                <div className="col-md-5 dashboard-product-image">
                  <Image
                    height="120vh"
                    width="120vw"
                    image={
                      product.imageUrl[0].includes("http")
                        ? product.imageUrl[0]
                        : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
                    }
                    alt={product.name}
                  />
                  <p className="seller-db-prod-name mr-3 w-100">
                    <Link to={`/product/${product._id}`} title={product.name}>
                      {product.name}
                    </Link>
                  </p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Qty:</strong>
                  </p>
                  <p>{product.stockQuantity}</p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Price:</strong>
                  </p>
                  <p>Ksh.{product.price.toLocaleString()} </p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Status:</strong>
                  </p>

                  {(product.stockQuantity < 1 && (
                    <p className="sold-out">Sold Out</p>
                  )) ||
                    (product.onSite && <p className="live">Live</p>) ||
                    (product.rejected && (
                      <p className="rejected">Rejected</p>
                    )) ||
                    (product.underReview && (
                      <p className="under-review">Under Review</p>
                    ))}
                  {/* <p className="live">
                    {(product.stockQuantity < 1 && "Sold Out") ||
                      (product.onSite && "live") ||
                      (product.rejected && "rejected") ||
                      (product.underReview && "Under Review")}
                  </p> */}
                </div>
                <div className="col-md-1">
                  <Link
                    to={`/seller/edit/${product._id}`}
                    className="btn btn-sm btn-danger"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>You currently don't have any products yet</div>
          )}
          {test &&
            test.length !== 0 &&
            test.map((product) => (
              <div
                key={product._id}
                className="row no-gutters dashboard-product-wrapper box-container"
              >
                <div className="col-md-5 dashboard-product-image">
                  <Image
                    height="120vh"
                    width="120vw"
                    image={
                      product.imageUrl[0].includes("http")
                        ? product.imageUrl[0]
                        : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
                    }
                    alt={product.name}
                  />
                  <p className="seller-db-prod-name mr-3 w-100">
                    <Link to={`/product/${product._id}`} title={product.name}>
                      {product.name}
                    </Link>
                  </p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Qty:</strong>
                  </p>
                  <p>{product.stockQuantity}</p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Price:</strong>
                  </p>
                  <p>Ksh.{product.price.toLocaleString()} </p>
                </div>
                <div className="col-md-2">
                  <p className="x mr-2">
                    <strong>Status:</strong>
                  </p>
                  <p className="live">Live</p>
                </div>
                <div className="col-md-1">
                  <Link
                    to={`/seller/edit/${product._id}`}
                    className="btn btn-sm btn-danger"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default DashBoardProduct;
