import React from "react";
import { Carousel } from "react-bootstrap";
import { IconContext } from "react-icons";
import { FaUserCircle, FaUserAlt } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
import Image from "../Market/Image";
import "./Carousel.css";
import { connect } from "react-redux";
import {
  signInClick,
  registerClick,
  emptySubCategories,
} from "../../redux/actions";
import { MdRateReview } from "react-icons/md";
import { GoClippy } from "react-icons/go";
import ScreenLoader from "../Pages/ScreenLoader";
// import Carousel from "react-slick";

class HeroCarousel extends React.Component {
  image = () => {
    let width = window.innerWidth;
    let img;
    if (width >= 1180) {
      img = "/hero.png";
    }
    if (width < 1180) {
      img = "/heromd.png";
    }
    if (width <= 1160) {
      img = "/heromdx.png";
    }
    if (width < 992) {
      img = "/heromds.png";
    }

    if (width < 850) {
      img = "/heromdl.png";
    }

    if (width < 768) {
      img = "/heromd.png";
    }
    if (width < 540) {
      img = "herosm.png";
    }

    return img;
  };

  shouldComponentUpdate(nextprops, nextState) {
    if (this.props.products) {
      return false;
    } else if (this.props.subCategories.length > 0) {
      return true;
    }
  }

  handleMouseEnter = () => {
    this.props.emptySubCategories();
  };
  render() {
    if (this.props.products.length === 0) return <ScreenLoader />;

    const randomStop = Math.ceil(Math.random() * this.props.products.length);
    const randomStart = randomStop < 4 ? randomStop + 4 : randomStop - 4;

    let trimmedProducts = this.props.products.slice(
      randomStart > randomStop ? randomStop : randomStart,
      randomStop > randomStart ? randomStop : randomStart
    );
    if (trimmedProducts.length < 4) {
      trimmedProducts = [
        ...trimmedProducts,
        ...this.props.products.slice(
          randomStop,
          randomStop > this.props.products.length ? randomStop - 4 : +1
        ),
      ];
    }

    return (
      <div className="hero-main-wrapper">
        <div id="hero-main-wrapper-left">
          {/* if subcategories array length>1 */}
          {/* {this.props.subCategories &&
            this.props.subCategories.length !== 0 && (
              <CategoryHoverPopup width={"102%"} height={"100%"} />
            )} */}
          {/* else null */}
          <div className="hero-carousel-wrapper">
            <div className="hero-carousel">
              <Carousel id="hero-sliders">
                {this.props.heroImages &&
                  this.props.heroImages.length !== 0 &&
                  this.props.heroImages.map((image) => (
                    <Carousel.Item
                      key={image._id}
                      onClick={() =>
                        this.props.history.push(
                          `/products/category/${image.category}`
                        )
                      }
                      className="slider"
                    >
                      <Image
                        image={`https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${image.imageUrl}`}
                        alt={image.imageUrl}
                        spinner={true}
                        heroImage={this.image()}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>

          <div className="random-stuff-wrapper">
            <div className="random-stuff">
              {trimmedProducts &&
                trimmedProducts.map((prod) => (
                  <div
                    key={prod._id}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.props.history.push(`/product/${prod._id}`)
                    }
                  >
                    <Image
                      height="120vh"
                      width="100%"
                      image={
                        prod.imageUrl[0].includes("http")
                          ? prod.imageUrl[0]
                          : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${prod.imageUrl[0]} `
                      }
                      alt={prod.name}
                      className="hero-random-image"
                    />

                    <h6 className="hero-product-name">{prod.name}</h6>

                    <p className="hero-product-price">
                      <small>Ksh.{prod.price.toLocaleString()}</small>
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div id="hero-main-wrapper-right" onMouseEnter={this.handleMouseEnter}>
          <div className="hero-account-section">
            <div className="d-flex justify-content-center flex-column align-items-center">
              <IconContext.Provider value={{ className: "hero-user" }}>
                {this.props.user ? (
                  <React.Fragment>
                    <FaUserCircle />
                    <strong>Hi, {this.props.user.firstName}</strong>
                  </React.Fragment>
                ) : (
                  <FaUserCircle />
                )}
              </IconContext.Provider>
              {!this.props.user ? (
                <p className="mt-3" style={{ fontWeight: "bolder" }}>
                  Welcome to Way4Biz
                </p>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                  }}
                  className="mt-4"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Link to="/account" className="hero-account-link">
                      <div className="hero-account-icon-wrapper">
                        <FaUserAlt />
                      </div>

                      <p>Account</p>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Link to="/orders" className="hero-account-link">
                      <div className="hero-account-icon-wrapper">
                        <GoClippy />
                      </div>
                      <p>Orders</p>
                    </Link>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Link to="/pending/reviews" className="hero-account-link">
                      <div className="hero-account-icon-wrapper">
                        <MdRateReview />
                      </div>

                      <p> Reviews</p>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {!this.props.user ? (
              <div className="hero-auth-btns my-4">
                <Link
                  onClick={() => this.props.signInClick()}
                  to="/sign-in"
                  className="btn btn-md sign-in-hero-btn"
                >
                  Sign In
                </Link>
                <Link
                  onClick={() => this.props.registerClick()}
                  to="/sign-in"
                  className="btn btn-md join-hero-btn"
                >
                  Join
                </Link>
              </div>
            ) : null}

            <div className="container anything pt-4">
              <div>
                <h4 id="latest-deal">Latest Deal</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    subCategories: state.product.subCategories,
    heroImages: state.product.heroImages,
    user: state.auth.user,
  };
};
export default withRouter(
  connect(mapStateToProps, { registerClick, signInClick, emptySubCategories })(
    HeroCarousel
  )
);
