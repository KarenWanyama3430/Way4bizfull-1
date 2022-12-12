import React from "react";
import "./AdminDashBoardComplaint.css";
import { Link } from "react-router-dom";
import "./Complaints.css";
import { fetchAllComplaints } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class Complaints extends React.Component {
  componentDidMount() {
    this.props.fetchAllComplaints();
  }
  render() {
    if (!this.props.complaints) return <ScreenLoader />;
    return (
      <div className="container">
        <div className="row y">
          <div className="col-md-4">
            <h6>Buyer Name</h6>
          </div>
          <div className="col-md-3">
            <h6>Seller Name</h6>
          </div>
          <div className="col-md-3">
            <h6>Product</h6>
          </div>
          <div className="col-md-2"></div>
        </div>
        {/* mapping here */}
        {this.props.complaints.length !== 0 &&
          this.props.complaints.map(comp => (
            <div key={comp._id} className="row box-container admin-complain-2">
              <div className="col-md-4">
                <p>
                  <strong className="x mr-1">Buyer:</strong>
                  <span>
                    {comp.buyerFirstName} {comp.buyerLastName}
                  </span>
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong className="x mr-1">Seller:</strong>
                  <span>
                    {comp.sellerFirstName} {comp.sellerLastName}
                  </span>
                </p>
              </div>
              <div className="col-md-3">
                <p>
                  <strong className="x mr-1">Product:</strong>
                  <span>{comp.productName}</span>
                </p>
              </div>
              <div className="col-md-2">
                <p>
                  <Link
                    to={`/admin/complaint/${comp._id}`}
                    className="complaint-view-more"
                  >
                    View More
                  </Link>
                </p>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    complaints: state.product.complaints
  };
};
export default connect(mapStateToProps, { fetchAllComplaints })(Complaints);
