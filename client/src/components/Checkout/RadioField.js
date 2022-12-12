import React from "react";
import { connect } from "react-redux";
import { paymentPerDistance } from "../../redux/actions";

const RadioField = props => {
  return (
    <div className="radio-title-button">
      <div className="radio">
        <input
          type={props.type}
          {...props.input}
          onChange={e => {
            if (e.target.name === "delivery") {
              props.paymentPerDistance({
                origins: ["Ngong Road Apartments, Ngong Road, Nairobi, Kenya"],
                destination: [props.latLng],
                deliveryMethod: e.target.value
              });
            }
            props.input.onChange(e);
          }}
          id={props.id}
        />
        <label htmlFor={props.id} className="ml-2">
          <p style={{ fontWeight: "600" }}>{props.label}</p>
        </label>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    latLng: state.detailsPersist.latLng
  };
};
export default connect(mapStateToProps, { paymentPerDistance })(RadioField);
