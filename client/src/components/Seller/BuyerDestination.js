import React, { Component } from "react";

import "./BuyerDestination.css";

export class BuyerDestination extends Component {
  render() {
    return (
      <div className="id-cut">
        <div>
          <strong className="x mr-2">Destination:</strong>
        </div>
        <p>{this.props.buyer.address}</p>
      </div>
    );
  }
}

export default BuyerDestination;
