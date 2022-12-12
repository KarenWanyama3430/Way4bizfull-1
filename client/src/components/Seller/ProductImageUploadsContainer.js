import React from "react";
import { FaTrashAlt } from "react-icons/fa";

import "./ProductImageUploadsContainer.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteImage } from "../../redux/actions";

// **TODO** MAP IMAGES FROM THE DB AND FROM S3
class ProductImageUploadsContainer extends React.Component {
  render() {
    const imageLength = this.props.images && this.props.images.length;

    return (
      <div className="uploads-container box-container">
        {/* mapping here */}
        {this.props.imageUrl.length !== 0 &&
          this.props.imageUrl.map(url => (
            <div key={url} className={`uploaded-product-image-wrapper`}>
              <div className="uploaded-product-image">
                <img
                  src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url}`}
                  alt={url}
                />
              </div>
              <div
                onClick={() =>
                  this.props.match.params.productId &&
                  this.props.deleteImage(url, this.props.match.params.productId)
                }
                className={`btn upload-image-trash-button disabled`}
              >
                <FaTrashAlt className="m-0 p-0" />{" "}
                <span className="ml-2">Delete</span>
              </div>
            </div>
          ))}
        {this.props.images &&
          this.props.images.length !== 0 &&
          this.props.images.map(url => (
            <div key={url} className="uploaded-product-image-wrapper">
              <div className="uploaded-product-image">
                <img
                  src={
                    url.includes("http")
                      ? url
                      : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${url} `
                  }
                  alt={url}
                />
              </div>
              <div
                onClick={() =>
                  this.props.match.params.productId &&
                  this.props.deleteImage(url, this.props.match.params.productId)
                }
                className={`btn upload-image-trash-button  ${
                  imageLength === 1 && `disable-trash disabled`
                }`}
              >
                <FaTrashAlt className="m-0 p-0" />{" "}
                <span className="ml-2">Delete</span>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    imageUrl: state.image.imageUrl,
    deleteImageLoading: state.image.deleteImageLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { deleteImage })(ProductImageUploadsContainer)
);
