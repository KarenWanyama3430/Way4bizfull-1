import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import "./Store.css";
import Image from "../Market/Image";
import HeroCategories from "../Hero/HeroCategories";
import { fetchStoreProducts, fetchAllCategories } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import CategoryHoverPopup from "../Hero/CategoryHoverPopup";
import Heart from "../Products/Heart";
import MobileLogo from "../Header/MobileLogo";

class Store extends Component {
  componentDidMount() {
    this.props.fetchStoreProducts(
      this.props.match.params.sellerId,
      this.props.history
    );
    this.props.fetchAllCategories();
  }
  render() {
    if (
      !this.props.storeProducts ||
      !this.props.categories ||
      !this.props.categories[0].icon
    )
      return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          {/* if buyer or seller display this header if admin display admin header */}
          <MobileLogo />
          <Header />
          <div className="container-fluid" id="products">
            <div className="row">
              <div className="col-lg-3">
                <div className="sticky-store-category">
                  <HeroCategories />
                </div>
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
                <div className="store-header py-2">
                  <h2 style={{ textAlign: "center" }}>
                    {this.props.storeProducts.length !== 0 &&
                      this.props.storeProducts[0].storeName}
                  </h2>
                </div>
                <div className="products-section">
                  {this.props.storeProducts.length !== 0 &&
                    this.props.storeProducts.map(pro => (
                      <div key={pro._id} className="product">
                        <Link
                          to={`/product/${pro._id}`}
                          title={pro.name}
                          className="product-link"
                        >
                          <Image
                            height="200vh"
                            width="150vw"
                            image={
                              pro.imageUrl[0].includes("http")
                                ? pro.imageUrl[0]
                                : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${pro.imageUrl[0]} `
                            }
                            alt={pro.name}
                          />
                          <div>
                            <p
                              className="product-name"
                              style={{ padding: "0px 10px" }}
                            >
                              {pro.name}
                            </p>
                            <p
                              style={{
                                fontWeight: "bolder",
                                padding: "0px 10px"
                              }}
                              className="price"
                            >
                              Ksh.{pro.price.toLocaleString()}
                            </p>
                          </div>
                        </Link>
                        {/* {pro.freeShipping && (
                        <div style={{ height: "10px", padding: "0px 10px" }}>
                          <p className="lead" style={{ fontSize: "smaller" }}>
                            Free Shipping
                          </p>
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0px 10px",
                        }}
                        className="mb-2"
                      >
                        <Heart />
                      </div> */}
                        <div className="shipping-heart">
                          <div
                            style={{
                              padding: "0px 0px 0px 10px",
                              margin: "0px",
                              fontSize: "smaller"
                            }}
                          >
                            {pro.freeShipping && (
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
                              margin: "0px"
                            }}
                            className="mb-2"
                          >
                            <Heart product={pro} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
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
const mapStateToProps = state => {
  return {
    storeProducts: state.product.storeProducts,
    categories: state.product.categories
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchStoreProducts, fetchAllCategories })(Store)
);
