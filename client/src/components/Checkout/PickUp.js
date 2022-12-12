import React from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "./PickUp.css";
import { selfCollectionAddress } from "../../redux/actions";
import { connect } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/core";

class PickUp extends React.Component {
  state = {
    loading: true,
  };
  handleSelect = async (selectedCity) => {
    const results = await geocodeByAddress(selectedCity);
    const latlng = await getLatLng(results[0]);
    this.props.selfCollectionAddress(latlng);
  };
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
            <span className="close-modal-btn" onClick={this.props.collection}>
              ×
            </span>
          </div>
          <div className="modal-body">
            {this.props.selfCollectionLoading && (
              <div id="pick-up-loader">
                <HashLoader
                  loading={this.state.loading}
                  size={40}
                  css={override}
                  color={"#f76b1a"}
                />
              </div>
            )}
            <div className="container p-0">
              <h4>Available pickup points</h4>
              <div className="ml-3 mt-2">
                <ul className="pick-up-points">
                  <li
                    onClick={() => this.handleSelect(this.props.city)}
                    style={{ cursor: "pointer" }}
                    className="pick-up-point"
                  >
                    <p>{this.props.city}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    city: state.selfCollection.city,
    selfCollectionLoading: state.selfCollection.selfCollectionLoading,
  };
};
export default connect(mapStateToProps, { selfCollectionAddress })(PickUp);
