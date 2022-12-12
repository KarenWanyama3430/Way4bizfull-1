import React from "react";

import "./SellerProfiling.css";
import SellerTermsAndConditions from "./SellerTermsAndConditions";
import SellerOrientationGuide from "./SellerOrientationGuide";
import SellerDashBoardMenu from "./SellerDashBoardMenu";
import SellerDashBoardHeader from "./SellerDashBoardHeader";
import SellerDocuments from "./SellerDocuments";
import {
  handleIncrementAction,
  handleDecrementAction,
  handleCheckAction,
} from "../../redux/actions";
import { connect } from "react-redux";
import FinishProfiling from "./FinishProfiling";

class SellerProfiling extends React.Component {
  handleCheck = (val) => {
    this.props.handleCheckAction(val);
  };

  handleIncrement = (e) => {
    e.preventDefault();

    this.props.handleIncrementAction();
  };

  handleDecrement = (e) => {
    e.preventDefault();

    this.props.handleDecrementAction();
  };

  setUpData() {
    switch (this.props.open) {
      case 0:
        return <SellerTermsAndConditions proceed={this.handleCheck} />;
      case 1:
        return <SellerOrientationGuide proceed={this.handleCheck} />;
      case 2:
        return <SellerDocuments proceed={this.handleCheck} />;
      case 3:
        return <FinishProfiling />;
      default:
        break;
    }
  }

  render() {
    let nextButton;
    if (this.props.proceed) {
      nextButton = (
        <button className="btn btn-md" onClick={this.handleIncrement}>
          Next
        </button>
      );
    } else {
      nextButton = (
        <button className="btn btn-md" onClick={this.handleIncrement} disabled>
          Next
        </button>
      );
    }
    return (
      <div className="container-fluid p-0 dashboard-wrapper">
        <SellerDashBoardHeader />
        <div className="row no-gutters">
          <div className="col-lg-3">
            <SellerDashBoardMenu />
          </div>
          <div className="col-lg-9 white-body px-0">
            {this.setUpData()}

            <div className="nav-btns container" style={{ height: "50px" }}>
              {this.props.open === 0 ? (
                <div></div>
              ) : (
                  <button className="btn btn-md" onClick={this.handleDecrement}>
                    Back
                  </button>
                )}

              {this.props.open === 3 ? null : nextButton}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    open: state.sellerDetails.open,
    proceed: state.sellerDetails.proceed,
  };
};
export default connect(mapStateToProps, {
  handleIncrementAction,
  handleDecrementAction,
  handleCheckAction,
})(SellerProfiling);
