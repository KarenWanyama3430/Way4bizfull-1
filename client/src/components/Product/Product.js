import React from "react";
import ReactImageMagnify from "react-image-magnify";
import { IoMdHeart, IoMdHeartEmpty, IoMdShare } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import "./Product.css";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import Header from "../Header/Header";
import AddToCartModalButton from "./AddToCartModalButton";
import Rating from "./Rating";
import { connect } from "react-redux";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
  fetchSingleProduct,
  fetchRelatedProducts,
  setUrl
} from "../../redux/actions";
import { IconContext } from "react-icons/lib";
import ProductSecondaryDetails from "./ProductSecondaryDetails";
import { Link, withRouter } from "react-router-dom";
import ScreenLoader from "../Pages/ScreenLoader";

import Image from "../Market/Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiMotorbikeLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";
import MobileLogo from "../Header/MobileLogo";
import {
  TiSocialInstagramCircular,
  TiSocialTwitterCircular,
  TiSocialFacebookCircular
} from "react-icons/ti";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      clicked: false,
      imageIndex: 0, // the index of the image to be shown,initially 0
      loaded: false,
      imageUrl: null
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.product &&
      this.props.fetchRelatedProducts(this.props.product.subcategory);
    this.props.setUrl(this.props.history.location.pathname);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.product) {
      this.props.product &&
        this.props.product.subcategory &&
        this.props.fetchRelatedProducts(this.props.product.subcategory);
    }
    if (prevState.imageIndex !== this.state.imageIndex) {
      this.setState({
        imageUrl: this.props.product.imageUrl[this.state.imageIndex]
      });
    }
    if (prevState.imageUrl !== this.state.imageUrl) {
      this.setState({ loaded: false });
    }
  }
  shouldComponentUpdate(prevProps, prevState) {
    if (
      prevProps.relatedProducts.length !== this.props.relatedProducts.length ||
      prevProps.productReviews.length !== this.props.productReviews.length ||
      prevState.imageIndex !== this.state.imageIndex ||
      this.state.clicked !== prevState.clicked ||
      this.props.product
    ) {
      return true;
    }
    return false;
  }
  showModal = () => {
    this.setState({ show: true });
    const { product, addToCart } = this.props;
    addToCart(product);
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleImageHover = (e, index) => {
    this.setState({
      imageIndex: index
    });
    // console.log(this.state.imageIndex);
    // modify the state imageIndex with the new index
  };

  processImageUrl(product) {
    if (!this.state.loaded) {
      return "/load.jpg";
    }
    if (product.imageUrl[this.state.imageIndex].includes("http")) {
      return product.imageUrl[this.state.imageIndex];
    }
    return `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${
      product.imageUrl[this.state.imageIndex]
    }`;
  }

  getImageProps() {
    const { product } = this.props;
    // console.log(product.imageUrl);
    return {
      smallImage: {
        alt: product.name,
        isFluidWidth: true,
        src: this.processImageUrl(product),
        onLoad: () => this.setState({ loaded: true })
      },
      largeImage: {
        src: this.processImageUrl(product),
        width: 800,
        height: 800
      },
      enlargedImageContainerStyle: { background: "#fff", zIndex: 9 }
    };
  }

  render() {
    const stockQuantity =
      this.props.product && this.props.product.stockQuantity;
    const itemInWishlist =
      this.props.product &&
      this.props.wishlist.find(
        item => item._id.toString() === this.props.product._id.toString()
      );
    let itemInCart = false;
    itemInCart =
      this.props.product &&
      this.props.product._id &&
      this.props.cart &&
      this.props.cart.find(item => item._id === this.props.product._id);

    const carouselSettings = {
      // dots: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false
    };
    if (!this.props.product) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          {this.props.product && (
            <div className="container-fluid product-wrapper">
              <AddToCartModalButton
                show={this.state.show}
                handleClose={this.hideModal}
              />

              <div className="row" id="product">
                <div className="col-md-9 product-imgs">
                  <div className="row">
                    <div className="col-md-5">
                      <ReactImageMagnify
                        enlargedImagePosition={"over"}
                        {...this.getImageProps()}
                      />
                      <div className="feature-imgs">
                        {this.props.product.imageUrl.length <= 4 ? (
                          this.props.product.imageUrl.map((item, idx) => (
                            <div key={idx}>
                              <img
                                className={`product-carousel-img ${
                                  idx === this.state.imageIndex
                                    ? `current-carousel-image`
                                    : null
                                }`}
                                onMouseOver={e => this.handleImageHover(e, idx)}
                                src={
                                  item.includes("http")
                                    ? item
                                    : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item} `
                                }
                                alt={this.props.product.name}
                              />
                            </div>
                          ))
                        ) : (
                          <Slider
                            {...carouselSettings}
                            className="product-carousel"
                          >
                            {this.props.product.imageUrl.map((item, idx) => (
                              <div key={idx}>
                                <img
                                  className={`product-carousel-img ${
                                    idx === this.state.imageIndex
                                      ? `current-carousel-image`
                                      : null
                                  }`}
                                  onMouseOver={e =>
                                    this.handleImageHover(e, idx)
                                  }
                                  src={
                                    item.includes("http")
                                      ? item
                                      : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item} `
                                  }
                                  alt={this.props.product.name}
                                />
                              </div>
                            ))}
                          </Slider>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-md-7 product-info"
                      style={{ position: "relative" }}
                    >
                      {stockQuantity >= 1 ? (
                        <span className="badge stock-badge in-stock-badge">
                          In Stock
                        </span>
                      ) : (
                        <span className="badge stock-badge out-of-stock-badge">
                          Out Of Stock
                        </span>
                      )}

                      <div className="product-name-wishlist">
                        <h5 className="mr-2">{this.props.product.name}</h5>
                        <IconContext.Provider
                          value={{ size: "2em", color: "#f76b1a" }}
                        >
                          {itemInWishlist && (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.props.removeFromWishlist(
                                  this.props.product
                                );
                              }}
                            >
                              <IoMdHeart />
                            </div>
                          )}
                          {!itemInWishlist && (
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                if (!this.props.isSignedIn) {
                                  return this.props.history.push("/sign-in");
                                }
                                this.props.addToWishlist(this.props.product);
                              }}
                            >
                              <IoMdHeartEmpty />
                            </div>
                          )}
                        </IconContext.Provider>
                      </div>
                      <div className="product-store">
                        <IconContext.Provider
                          value={{ className: "product-store-icon-wrapper" }}
                        >
                          <FaStore />
                        </IconContext.Provider>
                        <p>
                          <span
                            style={{
                              cursor: "pointer",
                              display: "inline-block"
                            }}
                            title="visit store"
                            onClick={() =>
                              this.props.history.push(
                                `/seller/store/${this.props.product.seller._id}`
                              )
                            }
                            className="store-name ml-2"
                          >
                            {this.props.product.seller.storeName}
                          </span>
                        </p>
                      </div>
                      <div className="product-rating">
                        {this.props.productReviews.length !== 0 ? (
                          <React.Fragment>
                            <Rating
                              key={this.props.productReviews.length}
                              size={18}
                              clickable={false}
                              value={Math.round(
                                this.props.productReviews
                                  .map(p => p.rating)
                                  .reduce((acc, cur) => acc + cur, 0) /
                                  this.props.productReviews.length
                              )}
                            />
                          </React.Fragment>
                        ) : (
                          <Rating size={18} clickable={false} value={0} />
                        )}

                        <span className="ml-2">
                          <Link
                            style={{ color: "#f76b1a" }}
                            to={`/product/main/reviews/${this.props.product._id}`}
                          >
                            (
                            {this.props.productReviews.length === 1 ? (
                              <span>
                                {this.props.productReviews.length} Review
                              </span>
                            ) : (
                              <span>
                                {this.props.productReviews.length} Reviews
                              </span>
                            )}{" "}
                            )
                          </Link>
                        </span>
                      </div>
                      <div className="product-price">
                        <h4>Ksh.{this.props.product.price.toLocaleString()}</h4>
                      </div>

                      <div>
                        <button
                          className="btn btn-md my-3 add-to-cart btn-block"
                          onClick={this.showModal}
                          disabled={
                            this.props.product.stockQuantity <= 0 ||
                            (itemInCart &&
                              itemInCart.quantity >=
                                this.props.product.stockQuantity)
                          }
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: "0px",
                          left: "0px",
                          right: "0px",
                          width: "90%",
                          marginLeft: "auto",
                          marginRight: "auto",
                          display: "flex",
                          height: "60px",
                          alignItems: "center",
                          fontSize: "1.5rem",
                          padding: "0px 8px"
                          // justifyContent: "space-between",
                        }}
                      >
                        <span>SHARE</span>
                        <IoMdShare
                          className="mx-2"
                          style={{ fontSize: "30px", flex: "1" }}
                        />
                        <div
                          style={{
                            flex: "2",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "100%",
                            fontSize: "35px"
                          }}
                        >
                          <TiSocialFacebookCircular className="product-share-icon" />
                          <TiSocialTwitterCircular className="product-share-icon" />
                          <TiSocialInstagramCircular className="product-share-icon" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div
                    className="delivery-info"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <div
                      style={{
                        borderBottom: "1px solid #d4d4d4",
                        padding: "10px 10px 5px 10px"
                      }}
                    >
                      <h5>DELIVERY</h5>
                    </div>
                    <div id="normal-delivery-info">
                      <h6 className="my-1">Normal Delivery</h6>
                      <div>
                        <FiTruck
                          style={{
                            fontSize: "50px",
                            marginRight: "10px"
                          }}
                        />
                        <p>
                          <span className="delivery-text my-1">
                            Delivery in 3-7 days. This method is ideal for goods
                            which are not urgent,bulk goods etc
                          </span>
                          <small>
                            <Link
                              className="learn-more-link"
                              to="/normal-delivery"
                            >
                              Learn More
                            </Link>
                          </small>
                        </p>
                      </div>
                    </div>
                    <div id="express-delivery-info">
                      <h6 className="my-1">Express Delivery</h6>
                      <div>
                        <RiMotorbikeLine
                          style={{
                            fontSize: "50px",
                            marginRight: "10px"
                          }}
                        />
                        <p>
                          <span className="delivery-text my-1">
                            Delivery within 24hrs. This delivery method is fast
                            but also expensive
                          </span>
                          <small>
                            <Link
                              className="learn-more-link"
                              to="/express-delivery"
                            >
                              Learn More
                            </Link>
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="related-products">
                <div className="row product-features-reviews-specifications mt-3">
                  <div className="col p-0">
                    <ProductSecondaryDetails
                      details={this.props.product.description}
                    />
                  </div>
                </div>
                {this.props.relatedProducts &&
                  this.props.relatedProducts.length !== 0 && (
                    <React.Fragment>
                      <h3>Related Products</h3>
                      {this.props.relatedProducts === 0 ? null : (
                        <div className="related-products-wrapper">
                          {this.props.relatedProducts.length !== 0 &&
                            this.props.relatedProducts.map(item => (
                              <Link key={item._id} to={`/product/${item._id}`}>
                                <div key={item._id} className="related-product">
                                  <Image
                                    image={
                                      item.imageUrl[0].includes("http")
                                        ? item.imageUrl[0]
                                        : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.imageUrl[0]} `
                                    }
                                    alt={item.name}
                                  />
                                  <p className="related-product-name">
                                    {item.name}
                                  </p>
                                  <p style={{ fontWeight: "bolder" }}>
                                    Ksh.{item.price.toLocaleString()}{" "}
                                  </p>
                                </div>
                              </Link>
                            ))}
                        </div>
                      )}
                    </React.Fragment>
                  )}
                {/* <div>
                  <h3>Recommended For You</h3>
                  <div className="recommended-products-wrapper">
                    {this.props.relatedProducts.length !== 0 &&
                      this.props.relatedProducts.map(item => (
                        <a key={item._id} href={`/product/${item._id}`}>
                          <div key={item._id} className="recommended-product">
                            <img src={item.imageUrl[0]} alt={item.name} />
                            <p className="recommended-product-name">
                              {item.name}
                            </p>
                            <p style={{ fontWeight: "bolder" }}>
                              Ksh.{item.price.toLocaleString()}{" "}
                            </p>
                          </div>
                        </a>
                      ))}
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let product;
  if (state.product.products.length !== 0) {
    product = state.product.product;
  }
  return {
    product,
    wishlist: state.cartReducer.wishlist,
    saveWishlistLoading: state.cartReducer.saveWishlistLoading,
    cart: state.cartReducer.cart,
    relatedProducts: state.product.relatedProducts,
    productReviews: state.product.productReviews,
    isSignedIn: state.auth.isSignedIn
  };
};
export default withRouter(
  connect(mapStateToProps, {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    fetchSingleProduct,
    fetchRelatedProducts,
    setUrl
  })(Product)
);
