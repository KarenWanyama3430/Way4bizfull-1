import React from "react";

import "./AdminDashBoardAddCategory.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { GiCancel } from "react-icons/gi";
import { addNewCategory } from "../../redux/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardAddCategory extends React.Component {
  state = {
    main: "",
    icon: "",
    subcategories: [],
    typing: "",
    charge: null,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleTypingSubmit = (e) => {
    if (this.state.typing !== "") {
      return this.setState({
        subcategories: [...this.state.subcategories, this.state.typing],
        typing: "",
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.main.trim() !== "" &&
      this.state.icon.trim() !== "" &&
      this.state.subcategories.length !== 0 &&
      this.state.charge
    ) {
      this.props.addNewCategory(
        {
          main: this.state.main.trim(),
          subcategories: this.state.subcategories,
          icon: this.state.icon.trim(),
          charge: this.state.charge,
        },
        this.props.history
      );
    }
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <MobileLogo />
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="container mt-4 mb-5">
          <div className="box-container">
            <h3 className="my-2" style={{ textAlign: "center" }}>
              Add Category
            </h3>
            <div className="container">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group add-category-form">
                  <label htmlFor="add-category">Category</label>
                  <input
                    name="main"
                    className="form-control"
                    type="text"
                    placeholder="eg Phones"
                    id="add-category"
                    onChange={this.handleChange}
                    value={this.state.main}
                  />
                  <label htmlFor="add-icon">Icon</label>
                  <input
                    name="icon"
                    className="form-control"
                    type="text"
                    placeholder="Icon Name"
                    id="add-icon"
                    onChange={this.handleChange}
                    value={this.state.icon}
                  />
                  <label htmlFor="charge">Charge</label>
                  <input
                    name="charge"
                    className="form-control"
                    type="number"
                    id="charge"
                    placeholder="15"
                    onChange={this.handleChange}
                    value={this.state.charge || ""}
                  />
                  <label htmlFor="sub-categories">Sub Categories</label>
                  <div className="input-group">
                    <input
                      name="typing"
                      type="text"
                      className="form-control"
                      placeholder="e.g iPhone"
                      onChange={this.handleChange}
                      value={this.state.typing}
                    />
                    <div
                      className="input-group-append"
                      onClick={this.handleTypingSubmit}
                    >
                      <button
                        id="sub-category-enter"
                        disabled={this.state.typing === ""}
                      >
                        <div className="icon-container">
                          <span>Enter</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap">
                    {this.state.subcategories.length !== 0 &&
                      this.state.subcategories.map((sub, index) => (
                        <div key={index} className="p-2">
                          <p className="sub-category-wrapper">
                            <span style={{ fontSize: "20px" }} className="mr-1">
                              {sub}
                            </span>{" "}
                            <strong
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.setState({
                                  subcategories: this.state.subcategories.filter(
                                    (s, i) => i !== index
                                  ),
                                })
                              }
                            >
                              <GiCancel style={{ color: "#f76b1a" }} />
                            </strong>
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-md add-category-btn mb-2"
                  disabled={
                    (this.state.main === "" &&
                      this.state.subcategories.length === 0) ||
                    this.props.addCategoryLoading
                  }
                >
                  {this.props.addCategoryLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {this.props.addCategoryLoading ? (
                    <span> {"  "}Loading...</span>
                  ) : (
                    <span>Add Category</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    addCategoryLoading: state.product.addCategoryLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { addNewCategory })(AdminDashBoardAddCategory)
);
