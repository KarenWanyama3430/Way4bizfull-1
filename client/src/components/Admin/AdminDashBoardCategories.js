import React from "react";

import "./AdminDashBoardCategories.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { Link } from "react-router-dom";
import { fetchAllAdminCategories } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import MobileLogo from "../Header/MobileLogo";

class AdminDashBoardCategories extends React.Component {
  componentDidMount() {
    this.props.fetchAllAdminCategories();
  }
  render() {
    if (!this.props.adminCategories) return <ScreenLoader />;
    return (
      <div className="container-fluid p-0">
        <MobileLogo />
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="mt-4 mb-5">
          <div>
            {this.props.adminCategories.length !== 0 ? (
              <React.Fragment>
                {" "}
                <h3 className="my-2" style={{ textAlign: "center" }}>
                  Categories
                </h3>
                <div className="container my-2">
                  <div className="row">
                    <div
                      className="col-lg-8 mx-auto"
                      id="add-category-btn-wrapper"
                    >
                      <Link
                        to="/admin-category/add"
                        className="btn btn-md add-category-btn"
                      >
                        Add Category
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 mx-auto">
                      {this.props.adminCategories.length !== 0 &&
                        this.props.adminCategories.map((cat) => (
                          <div
                            key={cat._id}
                            className="box-container admin-category-wrapper"
                          >
                            <div className="p-3 align-items-center">
                              <div className="mb-2">
                                <h4
                                  style={{
                                    textTransform: "capitalize",
                                    textAlign: "center",
                                  }}
                                >
                                  {cat.category.main}
                                </h4>
                              </div>
                              <div>
                                <p className="sub-categories">
                                  {cat.category.subcategories.map((s, i) => {
                                    if (
                                      cat.category.subcategories.length ===
                                      i + 1
                                    ) {
                                      return (
                                        <React.Fragment key={i}>
                                          <span>{s}</span>
                                        </React.Fragment>
                                      );
                                    }
                                    return (
                                      <React.Fragment key={i}>
                                        <span>{s}</span>
                                      </React.Fragment>
                                    );
                                  })}
                                </p>
                              </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                              <div>
                                <Link
                                  to={`/admin-category/edit/${cat._id}`}
                                  className="btn btn-md edit-category-btn mb-2"
                                >
                                  Edit Category
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {/* mapping here */}
                </div>
              </React.Fragment>
            ) : (
              <div className="admin-no-categories">
                <h4>No categories yet. Proceed to add category.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    adminCategories: state.product.adminCategories,
  };
};
export default connect(mapStateToProps, { fetchAllAdminCategories })(
  AdminDashBoardCategories
);
