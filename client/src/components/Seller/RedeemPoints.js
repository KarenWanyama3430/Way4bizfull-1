import React from "react";

import "./RedeemPoints.css";
import { BsCheckCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { redeemPoints } from "../../redux/actions";

class RedeemPoints extends React.Component {
  render() {
    return (
      <div className="container py-2">
        {/* show this first */}
        {!this.props.redeemSuccess && (
          <React.Fragment>
            <h6>
              By redeeming your points, money will be sent to your mpesa
              account. If you redeemed and have not received within 24 hours,
              please contact us <Link to="/contact-us">here</Link>. Only 1000
              points and above are redeemable.
            </h6>
            <div className="d-flex align-items-center justify-content-center">
              <button
                disabled={this.props.points < 1000}
                className="btn btn-md redeem-btn mt-3"
                onClick={() => this.props.redeemPoints()}
              >
                {this.props.redeemPointsLoading && (
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {this.props.redeemPointsLoading ? (
                  <span> {"  "}Loading...</span>
                ) : (
                  <span>Redeem Now</span>
                )}
              </button>
              <br />
              {this.props.redeemPointsError && (
                <div className="form-primary-error">
                  {this.props.redeemPointsError}
                </div>
              )}
            </div>
          </React.Fragment>
        )}

        {/* show on successful redeeming */}
        {this.props.redeemSuccess && (
          <React.Fragment>
            <div className="d-flex align-items-center justify-content-center">
              <BsCheckCircle style={{ fontSize: "100px", color: "#4BB543" }} />
            </div>
            <h6 className="mt-3">
              You successfully redeemed {this.props.points} points. Ksh.{" "}
              {this.props.points.toLocaleString()} will be sent to your mpesa
              account within 24 hours.
            </h6>
          </React.Fragment>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    points: state.auth.user.points,
    redeemPointsLoading: state.seller.redeemPointsLoading,
    redeemPointsError: state.seller.redeemPointsError,
    redeemSuccess: state.seller.redeemSuccess
  };
};
export default connect(mapStateToProps, { redeemPoints })(RedeemPoints);
