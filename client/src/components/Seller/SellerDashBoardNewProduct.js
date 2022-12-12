import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import validator from "validator";
import {
  addProduct,
  unpersistImage,
  fetchAllAdminCategories,
  fetchAllSellerCategories,
} from "../../redux/actions";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDropDown from "./SellerDropDown";
import SellerCheckBox from "./SellerCheckBox";
import ControlledEditor from "./Editor";
import SellerInputField from "./SellerInputField";
import PhotosPage from "./PhotosPage";
import ProductImageUploadsContainer from "./ProductImageUploadsContainer";
import ScreenLoader from "../Pages/ScreenLoader";

export class Sell extends Component {
  componentDidMount() {
    this.props.fetchAllAdminCategories();
    this.props.fetchAllSellerCategories();
  }
  componentWillUnmount() {
    this.props.unpersistImage();
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (this.props.deleteImageLoading || !this.props.adminCategories)
      return <ScreenLoader />;
    const adminCategories =
      this.props.adminCategories.length !== 0 &&
      this.props.adminCategories.map((cat) => ({
        key: cat.category.main,
        text: cat.category.main,
        value: cat.category.main,
      }));
    const adminSubCategories =
      this.props.adminCategories.length !== 0 &&
      this.props.adminCategories.find(
        (cat) => cat.category.main === this.props.category
      );
    const subcategories =
      adminSubCategories &&
      adminSubCategories.category &&
      adminSubCategories.category.subcategories.map((sub) => ({
        key: sub,
        text: sub,
        value: sub,
      }));
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9 p-0 mt-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h3 style={{ textAlign: "center" }}>Sell New Product</h3>
                </div>
              </div>
              <div className="row">
                <div id="dashboard-new-lg-screen" className="col p-0">
                  <form
                    onSubmit={this.props.handleSubmit((formValues) =>
                      this.props.addProduct(
                        {
                          ...formValues,
                          description: this.props.description,
                          imageUrl: this.props.imageUrl,
                        },
                        this.props.history
                      )
                    )}
                  >
                    <Field
                      type="text"
                      name="name"
                      label="Name Of The Product"
                      component={SellerInputField}
                    />
                    <Field
                      type="number"
                      name="price"
                      label="Price Of The Product in Ksh."
                      component={SellerInputField}
                    />

                    <Field
                      type="number"
                      name="stockQuantity"
                      label="Product Quantity"
                      component={SellerInputField}
                    />
                    <Field
                      type="checkbox"
                      name="freeShipping"
                      label="Free Shipping"
                      component={SellerCheckBox}
                    />
                    {/* DROPDOWNS */}
                    <Field
                      options={adminCategories}
                      name="category"
                      label="Product Category"
                      component={SellerDropDown}
                    />
                    <br />
                    <Field
                      disabled={!subcategories}
                      options={subcategories}
                      name="subcategory"
                      label="Product Subcategory"
                      component={SellerDropDown}
                    />

                    <h5 style={{ width: "90%", margin: "15px auto 0 auto" }}>
                      Image Upload
                    </h5>
                    <PhotosPage />
                    {this.props.uploadImageError && (
                      <div
                        style={{
                          color: "red",
                          width: "90%",
                          margin: "15px auto 0 auto",
                        }}
                      >
                        {this.props.uploadImageError}
                      </div>
                    )}
                    <h5 style={{ width: "90%", margin: "15px auto 0 auto" }}>
                      Uploaded Images
                    </h5>
                    <ProductImageUploadsContainer />

                    <h5 style={{ width: "90%", margin: "15px auto 5px auto" }}>
                      Product Description
                    </h5>

                    <ControlledEditor />
                    {this.props.addProductError && (
                      <div
                        style={{
                          color: "red",
                          width: "90%",
                          margin: "1px auto 0 auto",
                        }}
                      >
                        <h5>{this.props.addProductError}</h5>
                      </div>
                    )}
                    <button
                      style={{ cursor: "pointer", width: "90%" }}
                      className="btn btn-md btn-block primary-button my-5"
                      disabled={
                        !this.props.valid ||
                        this.props.loading ||
                        !this.props.imageUrl
                      }
                      type="submit"
                    >
                      {this.props.loading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {this.props.loading ? (
                        <span> {"  "}Loading...</span>
                      ) : (
                        <span>Add Product</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.name ||
    (formValues.name && formValues.name.trim().length < 2)
  ) {
    errors.name = "Please enter a valid product name";
  }
  if (!formValues.price) {
    errors.price = "Please enter a valid price";
  }
  if (!formValues.stockQuantity) {
    errors.email = "Please enter a valid product quantity";
  }
  if (!formValues.category) {
    errors.category = "Please choose a category";
  }
  if (!formValues.subcategory) {
    errors.subcategory = "Please enter a valid subcategory";
  }

  if (
    !formValues.imageUrl ||
    (formValues.imageUrl.length !== 0 &&
      !validator.isURL(formValues.imageUrl[0]))
  ) {
    errors.imageUrl = "Please enter a valid image url";
  }

  return errors;
};
const selector = formValueSelector("Sell");
const mapStateToProps = (state) => {
  const category = selector(state, "category");
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    description: state.product.description,
    adminCategories: state.product.adminCategories,
    addProductError: state.product.addProductError,
    imageUrl: state.image.imageUrl,
    uploadImageError: state.image.uploadImageError,
    deleteImageLoading: state.image.deleteImageLoading,
    category,
  };
};
export default withRouter(
  reduxForm({
    validate,
    form: "Sell",
  })(
    connect(mapStateToProps, {
      addProduct,
      unpersistImage,
      fetchAllAdminCategories,
      fetchAllSellerCategories,
    })(Sell)
  )
);
