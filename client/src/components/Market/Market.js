import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Market.css";
import { connect } from "react-redux";
import Heart from "../Products/Heart";
import { fetchMoreProducts, hasMoreFalse } from "../../redux/actions";
import RandomCategories from "./RandomCategories";
import BottomPageLoader from "../Pages/BottomPageLoader";
import Image from "./Image";
import ScreenLoader from "../Pages/ScreenLoader";

function Market(props) {
  const observer = useRef();
  const lastItemElementRef = useCallback(
    node => {
      const fetchMoreData = () => {
        if (props.products.length < props.productCount) {
          return props.fetchMoreProducts();
        }
        props.hasMoreFalse();
      };
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [props]
  );

  if (props.fetchProductsLoading) return <ScreenLoader />;
  return (
    <div className="container-fluid market">
      {/* <div className="col market-head"></div> */}
      <RandomCategories />
      <div className="products-section">
        {props.products.length !== 0 &&
          props.products.map((product, index) => {
            if (props.products.length === index + 1) {
              return (
                <div
                  key={product._id}
                  className="product"
                  ref={lastItemElementRef}
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

                    <div style={{ padding: "0px 10px" }}>
                      <p className="product-name">{product.name}</p>
                      <p style={{ fontWeight: "bolder" }} className="price">
                        Ksh.{product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                  <div className="shipping-heart">
                    <div style={{ padding: "0px 10px" }}>
                      {product.freeShipping && (
                        <span style={{ fontSize: "smaller" }}>
                          Free Shipping
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 10px"
                      }}
                      className="my-2 product-heart"
                    >
                      <Heart product={product} />
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className="product" key={product._id}>
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
                  <div style={{ padding: "0px 10px" }}>
                    <p className="product-name">{product.name}</p>
                    <p style={{ fontWeight: "bolder" }} className="price">
                      Ksh.{product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
                <div className="shipping-heart">
                  <div
                    style={{
                      padding: "0px 0px 0px 10px",
                      margin: "0px",
                      fontSize: "smaller"
                    }}
                  >
                    {product.freeShipping && <span>Free Shipping</span>}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      padding: "0px 10px 0px 0px",
                      margin: "0px"
                    }}
                    className="product-heart"
                  >
                    <Heart product={product} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {props.products.length < props.productCount && <BottomPageLoader />}
    </div>
  );
}
const mapStateToProps = state => {
  return {
    products: state.product.products,
    productCount: state.product.productCount,
    fetchProductsLoading: state.product.fetchProductsLoading,
    hasMore: state.product.hasMore
  };
};
export default connect(mapStateToProps, { fetchMoreProducts, hasMoreFalse })(
  Market
);
