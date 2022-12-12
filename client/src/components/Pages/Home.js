import React from "react";
import Hero from "../Hero/Hero";
import Market from "../Market/Market";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { fetchProducts } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "./ScreenLoader";
import "./Home.css";
import MobileLogo from "../Header/MobileLogo";

class Home extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchProducts();
  }
  render() {
    if (this.props.products.length === 0) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div id="top-border"></div>
          <Hero />
          <Market />
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.product.products,
  };
};
export default connect(mapStateToProps, { fetchProducts })(Home);
