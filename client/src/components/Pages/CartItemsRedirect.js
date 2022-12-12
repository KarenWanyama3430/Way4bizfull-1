import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { connect } from "react-redux";
import "./CartItemsRedirect.css";
import MobileLogo from "../Header/MobileLogo";
import { Link, withRouter } from "react-router-dom";
import { emptyItemsInCart, fetchItemsInCart } from "../../redux/actions";
import Image from "../Market/Image";
import ScreenLoader from "./ScreenLoader";

class CartItemsRedirect extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    // FETCH ITEMS IN CART
    this.props.fetchItemsInCart(this.props.history);
  }
  componentWillUnmount() {
    // REMOVE FETCHED ITEMS FROM CART
    this.props.emptyItemsInCart();
  }

  render() {
    if (!this.props.fetchedItems) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="white-body">
            {" "}
            <div className="container cart-redirect-body">
              <p className="my-2">
                The following items stock quantity is less than what you are
                requesting. Please make the corrections.
              </p>
              <div>
                {/* mapping here */}
                {this.props.fetchedItems &&
                  this.props.fetchedItems.length !== 0 &&
                  this.props.fetchedItems.map((item) => (
                    <div className="row" key={item._id}>
                      <div className="col-6 text-center">
                        <Image
                          height="100px"
                          width="100px"
                          image={
                            item.imageUrl[0].includes("http")
                              ? item.imageUrl[0]
                              : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${item.imageUrl[0]} `
                          }
                          alt={item.name}
                        />
                      </div>
                      <div className="col-6 text-left">
                        <h3>{item.name}</h3>
                        <p>
                          {item.stockQuantity > 0
                            ? item.stockQuantity + "in stock"
                            : "item out of stock"}
                        </p>
                        <p>
                          Change <Link to="/cart">here</Link>
                        </p>
                      </div>
                    </div>
                  ))}
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
const mapStateToProps = (state) => {
  return {
    fetchedItems: state.cartReducer.fetchedItems,
    cart: state.cartReducer.cart,
  };
};
export default withRouter(
  connect(mapStateToProps, { emptyItemsInCart, fetchItemsInCart })(
    CartItemsRedirect
  )
);
