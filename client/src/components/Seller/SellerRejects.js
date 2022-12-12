import React from "react";

import "./SellerRejects.css";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import { Link, withRouter, Redirect } from "react-router-dom";
import { fetchRejects, deleteSellerProduct } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import { GiGlassCelebration } from "react-icons/gi";

class SellerRejects extends React.Component {
  componentDidMount() {
    if (this.props.user && this.props.user.isSeller) {
      this.props.fetchRejects();
    }
  }
  render() {
    if (this.props.user && !this.props.user.isSeller)
      return <Redirect to="/seller/profiling" />;
    if (!this.props.sellerRejects) return <ScreenLoader />;
    return (
      <div className="container-fluid dashboard-wrapper">
        <SellerDashBoardHeader />

        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9 mx-auto">
            <div className="dashboard-content">
              {" "}
              <div className="container-fluid box-container m-0 mx-auto">
                {this.props.sellerRejects.length !== 0 ? (
                  <React.Fragment>
                    <h3 style={{ textAlign: "center" }} className="mt-3 mb-2">
                      Rejected Products
                    </h3>
                    {this.props.sellerRejects.length !== 0 &&
                      this.props.sellerRejects.map((rej) => (
                        <div
                          key={rej._id}
                          className="box-container reject-info p-2"
                        >
                          <h5 className="my-2">{rej.name}</h5>
                          <p>
                            {rej.body} -{" "}
                            <strong>
                              {new Date(rej.createdAt).toLocaleString()}
                            </strong>
                          </p>
                          <div className="reject-links mt-2 pt-2">
                            <Link
                              to={`/seller/edit/${rej.productId}`}
                              className="reject-link"
                            >
                              Edit Product
                            </Link>
                            <div
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.props.deleteSellerProduct(
                                  rej.productId,
                                  this.props.history
                                )
                              }
                              className="reject-link"
                            >
                              Delete Product
                            </div>
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                ) : (
                  <div className="no-seller-products-rejects">
                    <GiGlassCelebration
                      style={{ fontSize: "100px", color: "#f76b1a" }}
                    />
                    <h4 className="mt-2">
                      Hurray! No rejected products yet.Rejected products will
                      appear here.
                    </h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sellerRejects: state.product.sellerRejects,
    user: state.auth.user,
  };
};
export default withRouter(
  connect(mapStateToProps, { fetchRejects, deleteSellerProduct })(SellerRejects)
);
