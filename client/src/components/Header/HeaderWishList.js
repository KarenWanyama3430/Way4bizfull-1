import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineHeart } from "react-icons/ai";

import "./HeaderWishList.css";
import { connect } from "react-redux";

class HeaderWishList extends React.Component {
  render() {
    return (
      <Link to="/wishlist" className="secondary-link">
        {/* <div className="icon flaticon-heart header-wishlist-icon"> */}
        <IconContext.Provider
          value={{ className: "icon header-wishlist-icon" }}
        >
          <div className="icon-container">
            <AiOutlineHeart />
            {this.props.isSignedIn ? (
              <span className="badge">{this.props.wishlist.length}</span>
            ) : (
              <span className="badge">0</span>
            )}
          </div>
        </IconContext.Provider>
        {/* <span className="badge">0</span> */}
        {/* </div> */}
      </Link>
    );
  }
}
const mapStateToProps = state => {
  return {
    wishlist: state.cartReducer.wishlist,
    isSignedIn: state.auth.isSignedIn
  };
};
export default connect(mapStateToProps)(HeaderWishList);
