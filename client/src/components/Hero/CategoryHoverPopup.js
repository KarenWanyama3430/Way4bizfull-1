import React from "react";
import "./CategoryHoverPopup.css";
import { Link } from "react-router-dom";
import { emptySubCategories } from "../../redux/actions";
import { connect } from "react-redux";

class CategoryHoverPopup extends React.Component {
  handleCleanArray = () => {
    // this.props.emptySubCategories();
  };
  render() {
    return (
      <div
        className="category-hover-popup"
        style={{
          width: this.props.width,
          height: this.props.height,
          position: this.props.position ? this.props.position : "absolute",
          top: this.props.top ? this.props.top : 0
        }}
        onMouseLeave={this.handleCleanArray}
      >
        <div className="hovered-sub-categories-section-wrapper">
          {/* mapping here */}
          <div className="hovered-sub-categories-section ">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                {/* on link click clean the array */}
                <Link onClick={this.handleCleanArray} to="/">
                  Test
                </Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>
          <div className="hovered-sub-categories-section">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>
          <div className="hovered-sub-categories-section">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>

          <div className="hovered-sub-categories-section">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>
          <div className="hovered-sub-categories-section">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>
          <div className="hovered-sub-categories-section">
            <h5 className="sub-category-title">Helloo World</h5>
            <ul>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
              <li>
                <Link to="/">Test</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {};
};
export default connect(mapStateToProps, { emptySubCategories })(
  CategoryHoverPopup
);
