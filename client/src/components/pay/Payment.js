import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import Paymentform from "./Payform";

class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_c1BqLuluRQcM0Db7vNOZul0w">
        <Elements>
          <Paymentform />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Payment;
