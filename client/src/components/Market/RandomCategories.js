import React from "react";
import { IconContext } from "react-icons";
import { AiOutlineBars } from "react-icons/ai";
import "./RandomCategories.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import MainIcons from "../MainCategories/MainIcons";

class RandomCategories extends React.Component {
  render() {
    if (!this.props.categories || !this.props.categories[0].icon)
      return <ScreenLoader />;
    const firstRow =
      this.props.categories.length > 2 && this.props.categories.slice(0, 3);
    const secondRow =
      this.props.categories.length > 7 && this.props.categories.slice(3, 7);
    return (
      <div className="md-screen-random-categories">
        <div id="random-categories-wrapper">
          <div className="container row-1">
            <div className="row no-gutters">
              {/* mapping here */}

              <div className="col-3">
                <div className="random-category-container">
                  <Link to="/categories">
                    <div className="random-category-icon">
                      <IconContext.Provider
                        value={{ className: "random-category-inner-icon" }}
                      >
                        <AiOutlineBars />
                      </IconContext.Provider>
                    </div>
                  </Link>
                  <div className="random-category-text">
                    <small>All Categories</small>
                  </div>
                </div>
              </div>
              {firstRow.map((cat) => (
                <div key={cat._id} className="col-3">
                  <div className="random-category-container">
                    <Link to={`/products/category/${cat._id}`}>
                      <div className="random-category-icon">
                        <IconContext.Provider
                          value={{ className: "random-category-inner-icon" }}
                        >
                          {MainIcons[cat.icon]}
                        </IconContext.Provider>
                      </div>
                    </Link>
                    <div className="random-category-text">
                      <small>{cat._id}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="container row-2">
            <div className="row no-gutters">
              {secondRow.map((cat, i) => (
                <div key={cat._id} className="col-3">
                  <div className="random-category-container">
                    <Link to={`/products/category/${cat._id}`}>
                      <div className="random-category-icon">
                        <IconContext.Provider
                          value={{ className: "random-category-inner-icon" }}
                        >
                          {MainIcons[cat.icon]}
                        </IconContext.Provider>
                      </div>
                    </Link>
                    <div className="random-category-text">
                      <small>{cat._id}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.product.categories,
  };
};
export default connect(mapStateToProps)(RandomCategories);
