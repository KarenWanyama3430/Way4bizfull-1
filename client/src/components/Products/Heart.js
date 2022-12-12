import React from "react";
import { IconContext } from "react-icons";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { connect } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/actions";
import { withRouter } from "react-router-dom";

class Heart extends React.Component {
  state = {
    clicked: false
  };
  render() {
    const itemInWishlist = this.props.wishlist.find(
      item => item._id === this.props.product._id
    );
    return (
      <div className="mt-2 p-0">
        <IconContext.Provider
          value={{ size: "1.5em", color: "#f76b1a", margin: "0px" }}
        >
          {this.state.clicked || itemInWishlist ? (
            <div
              style={{ cursor: "pointer", margin: "0px", padding: "0px" }}
              onClick={() => {
                this.props.removeFromWishlist(this.props.product);
                this.setState({ clicked: false });
              }}
            >
              <IoMdHeart />
            </div>
          ) : (
            <div
              style={{ cursor: "pointer", margin: "0px", padding: "0px" }}
              onClick={() => {
                if (!this.props.isSignedIn) {
                  return this.props.history.push("/sign-in");
                }
                this.props.addToWishlist(this.props.product);
                this.setState({ clicked: true });
              }}
            >
              <IoMdHeartEmpty />
            </div>
          )}
        </IconContext.Provider>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    wishlist: state.cartReducer.wishlist,
    isSignedIn: state.auth.isSignedIn
  };
};
export default withRouter(
  connect(mapStateToProps, { addToWishlist, removeFromWishlist })(Heart)
);
