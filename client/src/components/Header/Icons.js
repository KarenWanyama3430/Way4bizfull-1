import React from "react";

import "./Icons.css";

import User from "./User";
import Cart from "./Cart";
import HeaderWishList from "./HeaderWishList";

class Icons extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
        <User />
        <Cart />
        <HeaderWishList />
      </div>
    );
  }
}

export default Icons;
