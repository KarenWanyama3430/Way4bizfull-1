import React from "react";

import "./Hero.css";

import SideBar from "./SideBar";
import CaroDisplay from "./CaroDisplay";
import { emptySubCategories } from "../../redux/actions";
import { connect } from "react-redux";

class Hero extends React.Component {
  handleMouseLeave = () => {
    // this.props.emptySubCategories();
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <div className="row" id="hero" onMouseLeave={this.handleMouseLeave}>
          <SideBar />
          <CaroDisplay />
        </div>
      </div>
    );
  }
}

export default connect(null, { emptySubCategories })(Hero);
