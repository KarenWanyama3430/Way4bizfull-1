import React from "react";
import "./AdminDashBoardNewProductReject.css";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashboardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import { connect } from "react-redux";
import { rejectMessage } from "../../redux/actions";
import { withRouter } from "react-router-dom";

class AdminDashBoardNewProductReject extends React.Component {
  state = {
    message: ""
  };
  render() {
    return (
      <div className="container-fluid p-0">
        <AdminDashBoardHeader />
        <AdminDashboardSecondaryHeader />
        <div className="container box-container mt-4 product-reject-form-wrapper">
          <form
            className="form-group"
            onSubmit={e => {
              e.preventDefault();
              this.props.rejectMessage(
                this.props.match.params.productId,
                this.state.message.trim().length !== 0 && this.state.message,
                this.props.history
              );
            }}
          >
            <div className="d-flex justify-content-center">
              <label
                htmlFor="product-reject-input"
                style={{ marginBottom: "4px", fontSize: "25px" }}
              >
                Why Reject?
              </label>
            </div>

            <textarea
              onChange={e => this.setState({ message: e.target.value })}
              value={this.state.message}
              id="product-reject-input"
              className="form-control"
            ></textarea>
            <div className="d-flex justify-content-center my-3">
              <button
                disabled={this.state.message.trim().length === 0}
                className="btn btn-md product-send-rejection"
              >
                {this.props.rejectReasonLoading && (
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {this.props.rejectReasonLoading ? (
                  <span> {"  "}Loading...</span>
                ) : (
                  <span>Send</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    rejectReasonLoading: state.product.rejectReasonLoading
  };
};
export default withRouter(
  connect(mapStateToProps, { rejectMessage })(AdminDashBoardNewProductReject)
);
