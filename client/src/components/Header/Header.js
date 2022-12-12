import React from "react";
import "./Header.css";
import Logo from "./Logo";
import Search from "./Search";
import Icons from "./Icons";
import SecondaryHeader from "./SecondaryHeader";
import { connect } from "react-redux";
import { fetchCartItems, fetchWishlistProducts } from "../../redux/actions";

class Header extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      this.props.fetchCartItems();
      this.props.fetchWishlistProducts();
    }
  }
  render() {
    return (
      <div id="header-wrapper">
        <div className="header d-flex primary-background">
          <Logo id="logo" />
          <Search id="header-search" />
          <Icons id="header-icons" />
        </div>
        <SecondaryHeader />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps, {
  fetchWishlistProducts,
  fetchCartItems
})(Header);
