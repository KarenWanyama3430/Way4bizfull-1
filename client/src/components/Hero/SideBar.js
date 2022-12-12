import React from "react";

import "./SideBar.css";

import HeroCategories from "./HeroCategories";
import { fetchAllCategories } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class SideBar extends React.Component {
  componentDidMount() {
    this.props.fetchAllCategories();
  }
  render() {
    if (!this.props.categories || !this.props.categories[0].icon)
      return <ScreenLoader />;
    return (
      <div id="sidebar" className="col-lg-3">
        <HeroCategories />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    categories: state.product.categories,
  };
};
export default connect(mapStateToProps, { fetchAllCategories })(SideBar);
