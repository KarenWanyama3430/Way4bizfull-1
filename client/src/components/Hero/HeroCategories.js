import React from "react";

import "./HeroCategories.css";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  singleCategory,
  fetchAllCategories,
  fetchSubCategories,
  emptySubCategories
} from "../../redux/actions";
import { IconContext } from "react-icons";
import { AiOutlineBars } from "react-icons/ai";
import { RiArrowDropRightLine } from "react-icons/ri";
import ScreenLoader from "../Pages/ScreenLoader";
import MainIcons from "../MainCategories/MainIcons";

class HeroCategories extends React.Component {
  handleEmptyArray = () => {
    // this.props.emptySubCategories();
  };

  handleMouseOver = (e, category) => {
    // this.props.fetchSubCategories(category);
  };
  render() {
    if (!this.props.categories) return <ScreenLoader />;
    return (
      <div id={this.props.id}>
        <div
          className="category-head"
          onMouseOverCapture={this.handleEmptyArray}
        >
          <h3>Categories</h3>
        </div>
        <ul className="categories">
          <li onMouseOverCapture={this.handleEmptyArray}>
            <Link
              to="/categories"
              onClick={() => this.props.fetchAllCategories()}
            >
              <AiOutlineBars />
              <span className="ml-2">All Categories</span>
            </Link>
            <IconContext.Provider value={{ className: "right-arrow" }}>
              <RiArrowDropRightLine />
            </IconContext.Provider>
          </li>
          {this.props.categories.length !== 0 &&
            this.props.categories.map(category => (
              <li
                key={category._id}
                onClick={() => {
                  this.handleEmptyArray();
                  this.props.history.push(`/products/category/${category._id}`);
                }}
                onMouseEnter={e => this.handleMouseOver(e, category._id)}
              >
                <div>
                  {MainIcons[category.icon]}
                  <span className="ml-2">{category._id}</span>
                </div>
                <IconContext.Provider value={{ className: "right-arrow" }}>
                  <RiArrowDropRightLine />
                </IconContext.Provider>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    categories: state.product.categories,
    subcategories: state.product.subcategories,
    filter: state.filter
  };
};
export default withRouter(
  connect(mapStateToProps, {
    singleCategory,
    fetchAllCategories,
    fetchSubCategories,
    emptySubCategories
  })(HeroCategories)
);
