import React, { Component } from "react";
import AccountMenu from "./AccountMenu";
import { Link, withRouter } from "react-router-dom";
import "./AddReview.css";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
// import Rating from "../Product/Rating";
import { redirectOnFail, submitReview } from "../../redux/actions";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import AddReviewForm from "./AddReviewForm";
import BeautyStars from "beauty-stars";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class AddReview extends Component {
  state = {
    value: 0,
  };
  componentDidMount() {
    this.props.redirectOnFail(
      this.props.match.params.productId,
      this.props.match.params.orderId,
      this.props.history
    );
  }

  ratingChanged = (val) => {
    this.setState({
      value: val,
    });
  };

  render() {
    if (this.props.redirectOnFailLoading) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <AccountHeader />
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <AccountMenu />
              </div>
              <div className="col-lg-8 box-container  add-review-wrapper">
                {/* <IconContext.Provider
                  value={{ className: "arrow-icon ml-3 my-2" }}
                >
                  <div className="d-flex align-items-center">
                    <Link to="/pending/reviews">
                      <BsArrowLeft />
                    </Link>
                    <h3 className="ml-3">Rate Item</h3>
                  </div>
                </IconContext.Provider> */}
                <div className="d-flex align-items-center">
                  <div style={{ flex: "1" }}>
                    <IconContext.Provider
                      value={{ className: "arrow-icon ml-3 my-2" }}
                    >
                      <div className="d-flex align-items-center">
                        <Link to="/pending/reviews">
                          <BsArrowLeft />
                        </Link>
                      </div>
                    </IconContext.Provider>
                  </div>

                  <h3 className="ml-1" style={{ flex: "2" }}>
                    Rate Item
                  </h3>
                </div>
                <div className="d-flex justify-content-center my-3">
                  {/* <Rating clickable={true} /> */}
                  <BeautyStars
                    value={this.state.value}
                    onChange={(val) => this.ratingChanged(val)}
                    size={30}
                    activeColor={"#f76b10"}
                    inactiveColor={"#d4d4d4"}
                  />
                </div>
                <form
                  style={{ textAlign: "center" }}
                  onSubmit={this.props.handleSubmit((formValues) =>
                    this.props.submitReview(
                      formValues,
                      this.state.value,
                      this.props.match.params.productId,
                      this.props.match.params.orderId,
                      this.props.history
                    )
                  )}
                >
                  <Field
                    name="firstName"
                    component={AddReviewForm}
                    type="text"
                    placeholder="Your Name"
                  />
                  <Field
                    name="title"
                    component={AddReviewForm}
                    type="text"
                    placeholder="e.g I like it/I love it"
                  />
                  <Field
                    name="body"
                    component={AddReviewForm}
                    type="text"
                    placeholder="Your Review..."
                  />

                  <button
                    className="btn btn-md mb-3 submit-review-btn"
                    disabled={
                      !this.props.valid ||
                      this.props.sellerReviewsLoading ||
                      this.state.value === 0
                    }
                    type="submit"
                  >
                    {this.props.sellerReviewsLoading && (
                      <span
                        className="spinner-grow spinner-grow-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    {this.props.sellerReviewsLoading ? (
                      <span> {"  "}Loading...</span>
                    ) : (
                      <span>Submit Review</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.firstName ||
    (formValues.firstName && formValues.firstName.trim().length === 0)
  ) {
    errors.firstName = "Please enter a valid first name";
  }
  if (
    !formValues.title ||
    (formValues.title && formValues.title.trim().length < 2)
  ) {
    errors.title = "Please enter a valid title";
  }
  if (
    !formValues.body ||
    (formValues.body && formValues.body.trim().length < 2)
  ) {
    errors.body = "Please enter a valid review";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
    sellerReviewsLoading: state.product.sellerReviewsLoading,
    redirectOnFailLoading: state.product.redirectOnFailLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { redirectOnFail, submitReview })(
    reduxForm({ validate, form: "AddReview" })(AddReview)
  )
);
