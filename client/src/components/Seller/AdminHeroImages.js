import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactDropzone from "./ReactDropzone";
import ReactCropper from "./ReactCropper";
import "./PhotosPage.css";
import "./AdminHeroImages.css";
import { uploadHeroImage } from "../../redux/actions";
import { connect } from "react-redux";

const AdminHeroImages = ({ uploadHeroImage, heroImageLoading, ...props }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(null);
  const [categorySelected, setCategorySelected] = useState(false);
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  const handleUploadImage = async () => {
    try {
      await uploadHeroImage(image, category);
      setCategorySelected(false);
      handleCancelCrop();
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleCategorySelect = e => {
    setCategory(e.target.value);
    setCategorySelected(true);
  };

  const categories = props.categories;

  return (
    <div
      className="container-v p-0 box-container"
      style={{
        width: "100%"
        // margin: "0px auto 10px auto",
      }}
    >
      <div className="row product-image-upload-hero no-gutters">
        <div className="col-xl-4">Step 1-Add Photo</div>
        <div className="col-xl-4">Step 2-Resize</div>
        <div className="col-xl-4">Step 3-Preview</div>
      </div>
      <hr className="mb-3" />
      <div className="row no-gutters align-items-center drop-stuff">
        <div className="col-xl-4">
          <ReactDropzone setFiles={setFiles} />
        </div>
        <div className="col-xl-4">
          {files.length > 0 && (
            <ReactCropper
              setImage={setImage}
              admin={16 / 11}
              imagePreview={files[0].preview}
            />
          )}
        </div>
        <div className="col-xl-4">
          {files.length > 0 && (
            <React.Fragment>
              <div
                className="img-preview"
                style={{
                  minHeight: "200px",
                  width: "1200px",
                  overflow: "hidden",
                  zIndex: "-1"
                }}
              />
              <select onChange={handleCategorySelect} className="hero-category">
                <option defaultValue>--select category---</option>
                {categories &&
                  categories.map((category, idx) => (
                    <option key={idx} value={category._id}>
                      {category._id}
                    </option>
                  ))}
              </select>
              <div
                style={{ cursor: "pointer" }}
                onClick={handleUploadImage}
                className="mt-3 admin-product-upload-btn-wrapper"
              >
                {categorySelected ? (
                  <div style={{ textAlign: "center" }}>
                    {heroImageLoading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}

                    {heroImageLoading ? (
                      <span> {"  "}Loading...</span>
                    ) : (
                      <span>Upload Image</span>
                    )}
                  </div>
                ) : null}
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    heroImageLoading: state.product.heroImageLoading,
    categories: state.product.categories
  };
};
export default connect(mapStateToProps, { uploadHeroImage })(AdminHeroImages);
