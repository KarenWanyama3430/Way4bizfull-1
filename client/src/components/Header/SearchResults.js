import React, { useRef, useCallback, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Categories from "../Hero/HeroCategories";
import { connect } from "react-redux";
import Heart from "../Products/Heart";
import {
  searchTermProducts,
  moreSearchTermProducts,
  hasMoreSearchFalse,
  handleChangeAction,
  handleRadioButtonAction,
  handleCheckboxAction,
  handleUrlSearchTerm,
  revertFilter,
  clearSearchTerm,
} from "../../redux/actions";
import Rating from "../Product/Rating";
import { IconContext } from "react-icons";
import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import "./SearchResults.css";
import { reduxForm } from "redux-form";
import BottomPageLoader from "../Pages/BottomPageLoader";
import ProductsInput from "../Products/ProductsInput";
import Image from "../Market/Image";
import ScreenLoader from "../Pages/ScreenLoader";
import CategoryHoverPopup from "../Hero/CategoryHoverPopup";
import MobileLogo from "./MobileLogo";

function SearchResults(props) {
  const observer = useRef();
  const { handleUrlSearchTerm, revertFilter, clearSearchTerm } = props;
  useEffect(() => {
    handleUrlSearchTerm(
      props.filter,
      props.history,
      props.match.params.searchTerm
    );
    return () => {
      revertFilter(null, null, null);
      clearSearchTerm();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const lastItemElementRef = useCallback(
    (node) => {
      const fetchMoreData = () => {
        if (props.searchProducts.length < props.searchProductCount) {
          return props.moreSearchTermProducts(
            props.filter,
            props.match.params.searchTerm
          );
        }
        props.hasMoreSearchFalse();
      };
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [props]
  );
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
  if (props.searchProductsLoading) return <ScreenLoader />;
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
                              onClick={() =>
                                props.searchTermProducts(
                                  props.filter,
                                  props.history,
                                  props.typing
                                )
                              }
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
                {props.searchProducts &&
                  props.searchProducts.length !== 0 &&
                  props.searchProducts.map((product, index) => {
                    if (props.searchProducts.length === index + 1) {
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
                                style={{ padding: "0px" }}
                              >
                                {product.name}
                              </p>
                              <p
                                style={{
                                  fontWeight: "bolder",
                                  padding: "0px",
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
                                height: "10px",
                                padding: "0px",
                                margin: "0px",
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
                                padding: "0px 10px",
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
                            height="200vh"
                            width="150vw"
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
              {props.hasMoreSearchProducts && <BottomPageLoader />}
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
    searchProducts: state.search.searchProducts,
    searchProductCount: state.search.searchProductCount,
    searchProductsLoading: state.search.searchProductsLoading,
    filter: state.filter,
    hasMoreSearchProducts: state.search.hasMoreSearchProducts,
    typing: state.cartReducer.typing,
  };
};

export default withRouter(
  reduxForm({ form: "Products" })(
    connect(mapStateToProps, {
      searchTermProducts,
      hasMoreSearchFalse,
      moreSearchTermProducts,
      handleRadioButtonAction,
      handleCheckboxAction,
      handleChangeAction,
      handleUrlSearchTerm,
      revertFilter,
      clearSearchTerm,
    })(SearchResults)
  )
);
