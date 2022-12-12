import React from "react";

import "./MainCategories.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper.js";
import "./MainCategories.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  singleCategory,
  fetchAllCategories,
} from "../../redux/actions/index.js";
import ScreenLoader from "../Pages/ScreenLoader.js";
import { IconContext } from "react-icons";
// import { AiOutlineBars } from "react-icons/ai";
import MainIcons from "./MainIcons.js";
import MobileLogo from "../Header/MobileLogo";

class MainCategories extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchAllCategories();
  }
  render() {
    if (this.props.singleCategoryLoading) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div id="all-categories-wrapper">
            <div className="container">
              <div className="row">
                <div className="col my-3">
                  <h3>All Categories</h3>
                </div>
              </div>
            </div>
            <div className="container categories-section box-container">
              {this.props.categories &&
                this.props.categories.length !== 0 &&
                this.props.categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/products/category/${category._id}`}
                    className="individual-category"
                    onClick={() =>
                      this.props.singleCategory(
                        category._id,
                        this.props.filter,
                        this.props.history
                      )
                    }
                  >
                    <IconContext.Provider
                      value={{ className: "small-screen-category-icon" }}
                    >
                      {MainIcons[category.icon]}
                    </IconContext.Provider>
                    <div className="ml-2">
                      <h6>{category._id}</h6>
                    </div>
                  </Link>
                ))}
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
    categories: state.product.categories,
    singleCategoryLoading: state.auth.singleCategoryLoading,
    filter: state.filter,
  };
};
export default withRouter(
  connect(mapStateToProps, { singleCategory, fetchAllCategories })(
    MainCategories
  )
);
