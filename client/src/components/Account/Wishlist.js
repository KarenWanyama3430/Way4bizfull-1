import React, { Component } from "react";
import AccountMenu from "./AccountMenu";
import { IconContext } from "react-icons";
import { BsHeartFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import "./WishList.css";
import AccountHeader from "../Header/AccountHeader";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addToCart,
  removeFromWishlist,
  fetchWishlistProducts,
} from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";

// DECREASE FROM BOTH CART AND WISHLIST
export class Wishlist extends Component {
  render() {
    return (
      <React.Fragment>
        <MobileLogo />
        <AccountHeader />
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <AccountMenu />
            </div>
            <div className="col-lg-8 box-container wishlist">
              <h4 style={{ textAlign: "center" }} className="mb-2">
                Saved Items
              </h4>
              {/* show this component if wishlist is empty */}
              {this.props.wishlist.length === 0 && (
                <React.Fragment>
                  <div className="container wishlist-no-saved-items">
                    <IconContext.Provider
                      value={{ className: "wishlist-large-icon" }}
                    >
                      <BsHeartFill />
                    </IconContext.Provider>
                    <h6>You haven’t saved an item yet!</h6>
                    <p id="wishlist-dummy-text">
                      Found something you like? Tap on the heart shaped icon
                      below the item to add it to your wishlist! All your saved
                      items will appear here.
                    </p>
                    <Link to="/" className="btn btn-lg wishlist-button mt-4">
                      Continue Shopping
                    </Link>
                  </div>
                </React.Fragment>
              )}
              {/* show this otherwise */}
              <div className="container-fluid wishlist-saved-items">
                {/* mapping here */}
                {this.props.wishlist.length !== 0 &&
                  this.props.wishlist.map((item) => (
                    <div
                      className="wishlist-product-wrapper box-container"
                      key={item._id}
                    >
                      <div className="row align-items-center">
                        <div className="col-12 wishlist-item-image">
                          <div className="row align-items-center">
                            <div className="image col-md-3 p-0">
                              <img
                                src={
                                  item.imageUrl[0].includes("http")
                                    ? item.imageUrl[0]
                                    : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.imageUrl[0]} `
                                }
                                alt={item.name}
                              />
                            </div>
                            <div className="col-md-9">
                              <h4 className="my-3">{item.name}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-12 wishlist-more-info">
                          <div className="row px-2 my-3 justify-content-between align-items-center">
                            <span className="d-flex">
                              {item.stockQuantity >= 1 ? (
                                <Link
                                  id="order-today-link"
                                  to="/cart"
                                  onClick={() => this.props.addToCart(item)}
                                >
                                  Order Today
                                </Link>
                              ) : (
                                <div className="badge stock-badge out-of-stock-badge">
                                  out of stock
                                </div>
                              )}
                            </span>
                            <span
                              id="remove-wishlist"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.props.removeFromWishlist(item)
                              }
                            >
                              <IconContext.Provider
                                value={{ className: "wishlist-trash" }}
                              >
                                <FaTrashAlt />
                                <span className="ml-2">Remove</span>
                              </IconContext.Provider>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wishlist: state.cartReducer.wishlist,
    wishlistLoading: state.cartReducer.wishlistLoading,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  removeFromWishlist,
  fetchWishlistProducts,
})(Wishlist);
