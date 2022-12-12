import React from "react";

import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashBoardSecondaryHeader from "./AdminDashboardSecondaryHeader";

import "./AdminDashBoardRejects.css";
import { Link } from "react-router-dom";
import { fetchRejectedProducts } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";
import Image from "../Market/Image";
// import { Link } from "react-router-dom";
// import { IconContext } from "react-icons";
// import { BsArrowLeft } from "react-icons/bs";

class AdminDashBoardRejects extends React.Component {
  componentDidMount() {
    this.props.fetchRejectedProducts();
  }
  render() {
    if (!this.props.rejectedProducts) return <ScreenLoader />;
    return (
      <div className="container-fluid p-0 mb-5">
        <AdminDashBoardHeader />
        <AdminDashBoardSecondaryHeader />
        <div className="container box-container mt-4">
          <div>
            {/* <IconContext.Provider value={{ className: "arrow-icon ml-3 my-2" }}>
              <div>
                <Link to="/">
                  <BsArrowLeft />
                </Link>
              </div>
            </IconContext.Provider> */}
            <h3 style={{ textAlign: "center" }} className="mt-2 mb-3">
              Rejected Products
            </h3>
          </div>
          {this.props.rejectedProducts.length !== 0 &&
            this.props.rejectedProducts.map(pro => (
              <div
                key={pro._id}
                className="box-container admin-rejected-product"
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <Image
                      width="80%"
                      style={{ margin: "auto" }}
                      image={
                        pro.imageUrl.includes("http")
                          ? pro.imageUrl
                          : `https://e-commerce-gig.s3.eu-west-2.amazonaws.com/${pro.imageUrl} `
                      }
                      alt={pro.imageUrl}
                    />
                  </div>
                  <div className="col-md-9">
                    <h5 className="my-1">
                      <strong>Name: </strong>
                      {pro.productName}
                    </h5>
                    <h5 className="my-1">
                      <strong>Owner: </strong>
                      <Link
                        to={`/seller/store/${pro.sellerId}`}
                        className="reject-to-store"
                        title="visit store"
                      >
                        {pro.sellerFirstName} {pro.sellerLastName}
                      </Link>
                    </h5>
                    <h6 className="why-reject">{pro.body}</h6>
                    <span>
                      {/* <Link className="admin-rejected-product-view-more" to="/">
                    View More
                  </Link> */}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
const mapStateToprops = state => {
  return {
    rejectedProducts: state.product.rejectedProducts
  };
};
export default connect(mapStateToprops, { fetchRejectedProducts })(
  AdminDashBoardRejects
);
