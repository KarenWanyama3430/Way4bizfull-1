import React from "react";
import "./FileComplain.css";
import { withRouter } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import AccountHeader from "../Header/AccountHeader";
import { IconContext } from "react-icons";
import { BsArrowLeft } from "react-icons/bs";
import { newComplaint, redirectOnNotDelivered } from "../../redux/actions";
import { connect } from "react-redux";
import ScreenLoader from "../Pages/ScreenLoader";

class FileComplain extends React.Component {
  state = {
    complaint: ""
  };
  componentDidMount() {
    this.props.redirectOnNotDelivered(
      this.props.match.params.productId,
      this.props.match.params.orderId,
      this.props.history
    );
  }
  handleSubmit = e => {
    e.preventDefault();
    this.state.complaint.trim().length !== 0 &&
      this.props.newComplaint(
        this.state.complaint,
        this.props.match.params.orderId,
        this.props.match.params.productId,
        this.props.history
      );
  };
  render() {
    if (this.props.redirectOnFailLoading) return <ScreenLoader />;
    return (
      <div className="main">
        <div className="content">
          <AccountHeader />
          <div className="container pending-reviews-wrapper">
            <div className="row">
              <div className="col-lg-4">
                <AccountMenu />
              </div>
              <div className="col-lg-8  box-container">
                <div className="container">
                  <IconContext.Provider
                    value={{ className: "arrow-icon ml-3 my-2" }}
                  >
                    <div className="d-flex align-items-center">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => this.props.history.goBack()}
                      >
                        <BsArrowLeft />
                      </div>
                      <h3 className="ml-3">File Complaint</h3>
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="container">
                  <form
                    className="form-group complain-form"
                    onSubmit={this.handleSubmit}
                  >
                    <div style={{ textAlign: "center" }}>
                      <label htmlFor="complain-input-field">
                        <strong>What is wrong?</strong>
                      </label>
                    </div>
                    <textarea
                      onChange={e =>
                        this.setState({ complaint: e.target.value })
                      }
                      rows="5"
                      id="complain-input-field"
                      className="form-control"
                    ></textarea>
                    <button
                      disabled={this.state.complaint.trim() === ""}
                      className="btn submit-complain mt-3"
                    >
                      {this.props.complaintLoading && (
                        <span
                          className="spinner-grow spinner-grow-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      )}
                      {this.props.complaintLoading ? (
                        <span> {"  "}Loading...</span>
                      ) : (
                        <span>Submit Complaint</span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    redirectOnFailLoading: state.product.redirectOnFailLoading,
    complaintLoading: state.product.complaintLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { redirectOnNotDelivered, newComplaint })(
    FileComplain
  )
);
