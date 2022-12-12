import React from "react";

import "./PaymentMethods.css";
import { Field } from "redux-form";
import RadioField from "./RadioField";

class PaymentMethods extends React.Component {
  render() {
    return (
      <div className="ml-3 mt-3">
        <div className="payment" id="mpesa">
          <Field
            type="radio"
            label="Mpesa"
            name="payment"
            value="mpesa"
            id="radio-10"
            component={RadioField}
          />

          <div className="payment-method-info">
            <div>
              <img src="mpesa.png" alt="m-pesa" />
            </div>
            <p>This is a fast and secure mobile money transfer method.</p>
          </div>
        </div>
        <div className="payment" id="debit">
          <Field
            type="radio"
            label="Debit Card/Credit Card"
            name="payment"
            value="debit/credit"
            id="radio-11"
            component={RadioField}
          />

          <div className="payment-method-info">
            <div>
              <img src="debit.png" alt="debit" />
            </div>
            <p>
              This is a fast secure bank money transfer method. Any valid card
              is supported.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentMethods;
