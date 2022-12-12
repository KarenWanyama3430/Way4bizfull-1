import React from "react";

import "./SmallScreenSubCategories.css";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

class SmallScreenSubCategories extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <IconContext.Provider value={{ className: "arrow-icon ml-3 my-2" }}>
              <div className="d-flex align-items-center">
                <Link to="/categories">
                  <BsArrowLeft />
                </Link>
                <h3 className="ml-3">Sub Category</h3>
              </div>
            </IconContext.Provider>
          </div>
        </div>
        <div className="container categories-section box-container">
          <Link to="/" className="individual-category">
            <div>Category</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default SmallScreenSubCategories;
