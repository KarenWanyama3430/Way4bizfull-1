import React from "react";

import "./DeliveryMethods.css";
import { Field } from "redux-form";
import RadioField from "./RadioField";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

class DeliveryMethods extends React.Component {
  render() {
    const showHideClassName = this.props.show
      ? "modal display-block"
      : "modal display-none";
    const override = css`
      display: block;
      margin: 0 auto;
    `;
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="modal-header">
            <span className="close-modal-btn" onClick={this.props.delivery}>
              ×
            </span>
          </div>
          <div className="modal-body">
            {this.props.paymentPerDistanceLoading && (
              <div id="delivery-loader">
                <HashLoader
                  loading={this.props.paymentPerDistanceLoading}
                  size={40}
                  css={override}
                  color={"#f76b1a"}
                />
              </div>
            )}
            <div className="container p-0">
              <h4>Delivery Methods</h4>
              <div className="ml-3 mt-2">
                <div className="delivery">
                  <Field
                    type="radio"
                    label="Normal Delivery"
                    name="delivery"
                    value="Normal"
                    id="radio-1000"
                    component={RadioField}
                  />

                  <div>
                    <p>
                      With normal delivery, goods will reach to you in 3-7
                      days.It is slower and also cheaper.
                    </p>
                  </div>
                </div>
                <div className="delivery">
                  <Field
                    type="radio"
                    label="Express Delivery"
                    name="delivery"
                    value="Express"
                    id="radio-1100"
                    component={RadioField}
                  />

                  <div>
                    <p>
                      With this delivery method, goods will reach to you in
                      24hrs. Its faster but also expensive.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <button onClick={handleClose}>close</button> */}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    paymentPerDistanceLoading: state.user.paymentPerDistanceLoading,
  };
};
export default connect(mapStateToProps)(DeliveryMethods);
