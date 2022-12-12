import React from "react";
import { connect } from "react-redux";

import "./SuccessfulDeliveries.css";

class SuccessfulDeliveries extends React.Component {
  render() {
    return (
      <div className="successful-deliveries">
        <div>
          {this.props.clients && this.props.clients.length !== 0 ? (
            <React.Fragment>
              {this.props.clients.map(client => {
                const {
                  receiverAddress,
                  receiveCity,
                  receiverPhoneNumber,
                  itemName
                } = client;
                let user;
                if (client.userSeller) {
                  user = client.userSeller;
                }
                if (client.user) {
                  user = client.user;
                }
                const { town, address, phoneNumber } = user;
                return (
                  <div key={client._id}>
                    <p>
                      Delivered {itemName} <strong>FROM </strong>
                      {town}, {address}
                      <strong> TO </strong>
                      {receiveCity}, {receiverAddress} on 15/10/2020
                    </p>
                    <p>Sender Phone: 0{phoneNumber}</p>
                    <p>Recipient Phone: 0{receiverPhoneNumber}</p>
                  </div>
                );
              })}
            </React.Fragment>
          ) : (
            <div>No successful deliveries yet.</div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    clients: state.riders.clients
  };
};
export default connect(mapStateToProps)(SuccessfulDeliveries);
