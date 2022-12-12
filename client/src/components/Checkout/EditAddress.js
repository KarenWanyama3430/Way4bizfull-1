import React, { Component } from "react";

import "./EditAddress.css";
import { Link } from "react-router-dom";

class EditAddressSection extends Component {
  render() {
    return (
      <div>
        <p style={{ margin: "0px 20px" }}>
          <small>
            This is the place your goods will be delivered. Be as precise as
            possible.
          </small>
        </p>
        <Link
          to="/address"
          style={{
            color: "#f76b1a",
            textDecoration: "none",
            marginLeft: "20px",
            padding: "3px",
          }}
          id="checkout-edit-address-link"
        >
          Change Address
        </Link>
      </div>
    );
  }
}

export default EditAddressSection;
