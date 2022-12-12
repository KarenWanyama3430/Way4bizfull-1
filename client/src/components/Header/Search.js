import React from "react";
import "./Search.css";
import {
  fetchProductsSearch,
  fetchProductReviews,
  handleSearchTerm,
  searchTermProducts,
  clearSearchTerm
} from "../../redux/actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineSearch } from "react-icons/ai";
import reactSringReplace from "react-string-replace";
import Image from "../Market/Image";
// import { debounce } from "lodash";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typing: ""
    };
    this.handleChange = this.handleChange.bind(this);
    // this.fetchSearch = debounce(this.fetchSearch, 1000);
  }
  async handleChange(e) {
    this.setState({
      typing: e.target.value
    });
    this.props.handleSearchTerm(e.target.value);
    this.fetchSearch(e.target.value);
  }
  fetchSearch(value) {
    this.props.fetchProductsSearch(value);
  }
  render() {
    return (
      <div id={this.props.id} className="col">
        {this.props.searchedProducts.length !== 0 ? (
          <div
            onClick={() => this.props.clearSearchTerm()}
            className="light-shed"
          ></div>
        ) : null}
        <div className="input-group">
          <input
            type="text"
            onChange={this.handleChange}
            className="form-control header-input-search"
            placeholder="Apple iPhone"
            value={this.props.typing}
          />
          <div className="input-group-append">
            <button
              disabled={
                (this.props.typing && this.props.typing.trim() === "") ||
                !this.props.typing
              }
              id="header-search-btn"
              onClick={() => {
                this.props.searchTermProducts(
                  this.props.filter,
                  this.props.history,
                  this.props.typing
                );
                this.props.history.push(
                  `/products/search/${this.props.typing}`
                );
                this.props.clearSearchTerm();
              }}
            >
              <IconContext.Provider value={{ className: "icon mr-1 " }}>
                <div className="icon-container">
                  <AiOutlineSearch />
                  <span>Search</span>
                </div>
              </IconContext.Provider>
            </button>
          </div>
        </div>
        {this.props.typing !== "" ? (
          <div className="search-output tertiary-background">
            {this.props.searchedProducts.length > 0 &&
              this.props.searchedProducts.map(product => (
                <div
                  onClick={() => this.props.clearSearchTerm()}
                  key={product._id}
                >
                  <div className="searched-output-link-wrapper">
                    <Link
                      to={`/product/${product._id}`}
                      className="searched-product-link"
                      onClick={() =>
                        this.props.fetchProductReviews(product._id)
                      }
                    >
                      <div className="search-product-image mr-4">
                        <Image
                          height="80px"
                          width="80px"
                          image={
                            product.imageUrl[0].includes("http")
                              ? product.imageUrl[0]
                              : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${product.imageUrl[0]} `
                          }
                          alt={product.name}
                        />
                      </div>
                      <p className="search-product-name">
                        {reactSringReplace(
                          product.name,
                          this.props.typing,
                          (match, i) => {
                            return (
                              <span
                                key={i}
                                style={{
                                  fontWeight: "bold",
                                  textDecoration: "underline"
                                }}
                              >
                                {match}
                              </span>
                            );
                          }
                        )}
                      </p>
                      <p className="search-product-price">
                        <strong>ksh.{product.price.toLocaleString()}</strong>
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchedProducts: state.product.searchedProducts,
    typing: state.cartReducer.typing,
    filter: state.filter
  };
};
export default withRouter(
  connect(mapStateToProps, {
    fetchProductsSearch,
    searchTermProducts,
    fetchProductReviews,
    handleSearchTerm,
    clearSearchTerm
  })(Search)
);
