import React, { useRef, useCallback } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Categories from "../Hero/HeroCategories";
import { connect } from "react-redux";
import Heart from "./Heart";
import {
  singleCategory,
  moreSingleCategoryProducts,
  hasMoreCategoryFalse,
  handleChangeAction,
  handleRadioButtonAction,
  handleCheckboxAction,
  handleOkayButton,
} from "../../redux/actions";
import Rating from "../Product/Rating";
import { IconContext } from "react-icons";
import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import "./Products.css";
import { reduxForm } from "redux-form";
import BottomPageLoader from "../Pages/BottomPageLoader";
import ProductsInput from "./ProductsInput";
import Image from "../Market/Image";
import CategoryHoverPopup from "../Hero/CategoryHoverPopup";
import MobileLogo from "../Header/MobileLogo";

function Products(props) {
  const observer = useRef();
  const lastItemElementRef = useCallback((node) => {
    const fetchMoreData = () => {
      if (props.length < props.categoryProductCount) {
        return props.moreSingleCategoryProducts(
          props.match.params.category,
          props.filter
        );
      }
      props.hasMoreCategoryFalse();
    };
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreData();
      }
    });
    if (node) observer.current.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleCheckbox = (event) => {
    const { checked, name } = event.target;

    props.handleCheckboxAction(
      { checked, name },
      props.match.params.category,
      props.history,
      props.match.params.searchTerm
    );
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    props.handleChangeAction({ name, value });
  };
  const handleRadioButton = (event) => {
    const { name, value } = event.target;
    props.handleRadioButtonAction(
      props.match.params.category,
      { name, value },
      props.history,
      props.match.params.searchTerm
    );
  };
  const { priceMax, priceMin, rating, freeShipping, price } = props.filter;
  return (
    <div className="main">
      <div className="content">
        <MobileLogo />
        <Header />
        <div className="container-fluid" id="products">
          <div className="row">
            <div className="col-lg-3">
              <Categories id="products-categories" />
            </div>
            <div
              className="col-lg-9"
              style={{ padding: "0px", position: "relative" }}
            >
              <div className="category-hover-popup-wrapper">
                <CategoryHoverPopup
                  width={"50%"}
                  height={"80vh"}
                  position={"sticky"}
                  top={"110px"}
                />
              </div>

              <div className="products-top">
                <div className="container products-lg-top">
                  <ProductsInput />
                </div>
                <div className="container products-sm-top">
                  <div className="row sort-sm-section-wrapper">
                    <div className="sort-sm-section" id="filter-section">
                      <IconContext.Provider
                        value={{ className: "sort-sm-icon" }}
                      >
                        <FiFilter />
                        <span>
                          <MdArrowDropDown />
                        </span>
                      </IconContext.Provider>
                      <div id="filter-stuff">
                        <div className="d-flex ">
                          <p className="mr-1">Price:</p>
                          <div>
                            <input
                              style={{ width: "50px" }}
                              type="number"
                              name="priceMin"
                              placeholder="min"
                              className="filter-price-input"
                              onChange={handleChange}
                              value={priceMin || ""}
                            />
                            -
                            <input
                              style={{ width: "50px" }}
                              name="priceMax"
                              type="number"
                              placeholder="max"
                              className="filter-price-input"
                              onChange={handleChange}
                              value={priceMax || ""}
                            />
                            <button
                              className="btn ml-2"
                              style={{
                                backgroundColor: "#f76b1a",
                                color: "#fff",
                                height: "20px",
                                width: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                              }}
                              onClick={() => {
                                console.log("products");
                                props.handleOkayButton(
                                  props.match.params.category,
                                  props.history
                                );
                              }}
                            >
                              OK
                            </button>
                          </div>
                        </div>

                        <div className="d-flex ">
                          <div className="checkbox ml-1 ">
                            <input
                              type="checkbox"
                              id="checkbox_1"
                              name="rating"
                              checked={rating}
                              onChange={handleCheckbox}
                            />
                            <label htmlFor="checkbox_1" className="d-flex">
                              <Rating clickable={false} size={10} value={4} />
                              <span className="ml-2">&up</span>{" "}
                            </label>
                          </div>
                        </div>
                        <div className="d-flex">
                          <div className="checkbox">
                            <input
                              type="checkbox"
                              name="freeShipping"
                              checked={freeShipping}
                              onChange={handleCheckbox}
                              id="checkbox_2"
                            />
                            <label htmlFor="checkbox_2" className="ml-1">
                              Free Shipping
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sort-sm-section" id="sort-section">
                      <IconContext.Provider
                        value={{ className: "sort-sm-icon" }}
                      >
                        <span>
                          <MdArrowDropDown />
                        </span>
                        <FaSortAmountDownAlt />
                      </IconContext.Provider>
                      <div id="sort-stuff">
                        <div className="d-flex ml-3">
                          <div className="radio">
                            <input
                              name="price"
                              checked={price === "lowestPrice"}
                              value="lowestPrice"
                              onChange={handleRadioButton}
                              type="radio"
                              id="radio_1"
                            />
                            <label htmlFor="radio_1" className="ml-1">
                              Lowest Price
                            </label>
                          </div>
                        </div>
                        <div className="d-flex ml-3">
                          <div className="radio">
                            <input
                              name="price"
                              checked={price === "highestPrice"}
                              value="highestPrice"
                              onChange={handleRadioButton}
                              type="radio"
                              id="radio_2"
                            />
                            <label htmlFor="radio_2" className="ml-1">
                              Highest Price
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="products-section">
                {props.singleCategoryProducts.length !== 0 &&
                  props.singleCategoryProducts.map((product, index) => {
                    if (props.singleCategoryProducts.length === index + 1) {
                      return (
                        <div
                          key={product._id}
                          ref={lastItemElementRef}
                          className="product"
                        >
                          <Link
                            key={product._id}
                            to={`/product/${product._id}`}
                            title={product.name}
                            className="product-link"
                          >
                            <Image
                              image={
                                product.imageUrl[0].includes("http")
                                  ? product.imageUrl[0]
                                  : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
                              }
                              alt={product.name}
                            />
                            <div style={{ padding: "0px" }}>
                              <p
                                className="product-name"
                                style={{ padding: "0px 10px" }}
                              >
                                {product.name}
                              </p>
                              <p
                                style={{
                                  fontWeight: "bolder",
                                  padding: "0px 10px",
                                }}
                                className="price"
                              >
                                Ksh.{product.price.toLocaleString()}{" "}
                              </p>
                            </div>
                          </Link>
                          <div className="shipping-heart">
                            <div
                              style={{
                                padding: "0px 0px 0px 10px",
                                margin: "0px",
                                fontSize: "smaller",
                              }}
                            >
                              {product.freeShipping && (
                                <p
                                  className="lead"
                                  style={{ fontSize: "smaller" }}
                                >
                                  Free Shipping
                                </p>
                              )}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                padding: "0px 10px 0px 0px",
                                margin: "0px",
                              }}
                              className="mb-2"
                            >
                              <Heart product={product} />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={product._id} className="product">
                        <Link
                          key={product._id}
                          to={`/product/${product._id}`}
                          title={product.name}
                          className="product-link"
                        >
                          <Image
                            image={
                              product.imageUrl[0].includes("http")
                                ? product.imageUrl[0]
                                : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
                            }
                            alt={product.name}
                          />
                          <div style={{ padding: "0px" }}>
                            <p
                              className="product-name"
                              style={{ padding: "0px 10px" }}
                            >
                              {product.name}
                            </p>
                            <p
                              style={{
                                fontWeight: "bolder",
                                padding: "0px 10px",
                              }}
                              className="price"
                            >
                              Ksh.{product.price.toLocaleString()}{" "}
                            </p>
                          </div>
                        </Link>
                        <div className="shipping-heart">
                          <div
                            style={{
                              padding: "0px 0px 0px 10px",
                              margin: "0px",
                              fontSize: "smaller",
                            }}
                          >
                            {product.freeShipping && <p>Free Shipping</p>}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              padding: "0px 10px 0px 0px",
                              margin: "0px",
                            }}
                            className="mb-2"
                          >
                            <Heart product={product} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {props.hasMoreCategoryProducts && <BottomPageLoader />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <MiniMenuWrapper />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    singleCategoryProducts: state.product.singleCategoryProducts,
    categoryProductCount: state.product.categoryProductCount,
    filter: state.filter,
    hasMoreCategoryProducts: state.product.hasMoreCategoryProducts,
  };
};

export default withRouter(
  reduxForm({ form: "Products" })(
    connect(mapStateToProps, {
      singleCategory,
      hasMoreCategoryFalse,
      moreSingleCategoryProducts,
      handleRadioButtonAction,
      handleCheckboxAction,
      handleChangeAction,
      handleOkayButton,
    })(Products)
  )
);
