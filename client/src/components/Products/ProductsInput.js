import React, { Component } from "react";
import Rating from "../Product/Rating";
import {
  handleChangeAction,
  handleCheckboxAction,
  singleCategory,
  handleRadioButtonAction,
  handleOkayButton
} from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./ProductsInput.css";

class ProductsInput extends Component {
  handleCheckbox = event => {
    const { checked, name } = event.target;

    this.props.handleCheckboxAction(
      { checked, name },
      this.props.match.params.category,
      this.props.history,
      this.props.match.params.searchTerm
    );
  };
  handleChange = event => {
    const { name, value } = event.target;

    this.props.handleChangeAction({ name, value });
  };
  handleRadioButton = event => {
    const { name, value } = event.target;
    this.props.handleRadioButtonAction(
      this.props.match.params.category,
      { name, value },
      this.props.history,
      this.props.match.params.searchTerm
    );
  };
  render() {
    const {
      priceMax,
      priceMin,
      rating,
      freeShipping,
      price
    } = this.props.filter;
    return (
      <div>
        <div className="row my-3">
          <div className="d-flex ml-3">
            <p className="mr-1">Price:</p>
            <div className="box-container sort-input-wrapper">
              <input
                onChange={this.handleChange}
                name="priceMin"
                placeholder="min"
                style={{ width: "80px" }}
                value={priceMin || ""}
              />
              -
              <input
                onChange={this.handleChange}
                name="priceMax"
                placeholder="max"
                style={{ width: "80px" }}
                value={priceMax || ""}
              />
              <button
                className="btn btn-sm ml-2"
                style={{ backgroundColor: "#f76b1a", color: "#fff" }}
                disabled={!priceMin || !priceMax}
                onClick={() =>
                  this.props.handleOkayButton(
                    this.props.match.params.category,
                    this.props.history
                  )
                }
              >
                OK
              </button>
            </div>
          </div>

          <div>
            <div className="checkbox ml-4 d-flex align-items-center">
              <input
                onChange={this.handleCheckbox}
                name="rating"
                type="checkbox"
                className="mr-1"
                checked={rating}
                id="checkbox-5"
              />
              <label
                htmlFor="checkbox-5"
                className="d-flex align-items-center m-0"
              >
                <Rating clickable={false} size={15} value={4} />
                <span className="ml-2">&up</span>{" "}
              </label>
            </div>
          </div>
          <div className="checkbox d-flex align-items-center ml-5">
            <input
              onChange={this.handleCheckbox}
              name="freeShipping"
              type="checkbox"
              checked={freeShipping}
              id="checkbox-10"
            />
            <label htmlFor="checkbox-10" className="m-0">
              Free Shipping
            </label>
          </div>
        </div>
        <div className="row my-3">
          <div className="d-flex ml-4 align-items-center">
            <div className="radio">
              <input
                name="price-lg"
                checked={price === "lowestPrice"}
                value="lowestPrice"
                type="radio"
                onChange={this.handleRadioButton}
                id="radio_3"
              />
              <label htmlFor="radio_3" className="m-0">
                Lowest Price
              </label>
            </div>
          </div>
          <div className="d-flex ml-3 align-items-center">
            <div className="radio">
              <input
                name="price-lg"
                checked={price === "highestPrice"}
                value="highestPrice"
                type="radio"
                onChange={this.handleRadioButton}
                id="radio_4"
              />

              <label htmlFor="radio_4" className="m-0">
                Highest Price
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};
export default withRouter(
  connect(mapStateToProps, {
    handleChangeAction,
    handleCheckboxAction,
    singleCategory,
    handleRadioButtonAction,
    handleOkayButton
  })(ProductsInput)
);
