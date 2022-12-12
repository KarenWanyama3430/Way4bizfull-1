import React from "react";
import { FaTrashAlt } from "react-icons/fa";

import "./ProductImageUploadsContainer.css";
import "./AdminHeroImagesContainer.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteHeroImage } from "../../redux/actions";

// **TODO** MAP IMAGES FROM THE DB AND FROM S3
class ProductImageUploadsContainer extends React.Component {
  state = {
    imageId: null,
  };
  render() {
    const imageLength = this.props.heroImages && this.props.heroImages.length;

    return (
      <div className="admin-uploads-container box-container">
        {/* mapping here */}
        {this.props.heroImages &&
          this.props.heroImages.length !== 0 &&
          this.props.heroImages.map((image) => (
            <div
              key={image._id}
              className="admin-uploaded-product-image-wrapper"
            >
              <div className="admin-hero-uploaded-image">
                <img
                  src={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${image.imageUrl} `}
                  alt={image.imageUrl}
                  width="100%"
                />
              </div>
              <div
                onClick={() => {
                  this.setState({ imageId: image._id });
                  this.props.deleteHeroImage(image.imageUrl);
                }}
                className={`btn admin-upload-image-trash-button  ${
                  imageLength === 1 && `disable-trash disabled`
                }`}
              >
                {this.state.imageId &&
                this.state.imageId.toString() === image._id ? (
                  this.props.deleteHeroImageLoading && (
                    <React.Fragment>
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {this.props.deleteHeroImageLoading ? (
                        <span> {"  "}Loading...</span>
                      ) : (
                        <span>
                          <FaTrashAlt className="m-0 p-0" />{" "}
                          <span className="ml-2">Delete</span>
                        </span>
                      )}
                    </React.Fragment>
                  )
                ) : (
                  <span>
                    <FaTrashAlt className="m-0 p-0" />{" "}
                    <span className="ml-2">Delete</span>
                  </span>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    heroImages: state.product.heroImages,
    deleteHeroImageLoading: state.admin.deleteHeroImageLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { deleteHeroImage })(ProductImageUploadsContainer)
);
