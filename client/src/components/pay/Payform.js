import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

class Payform extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false, name: "", list: [] };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const self = this;
    axios
      .get("api/counter/data")
      .then(res => (self.setState({ list: res.data }), console.log(res.data)))
      .catch(err => console.log(err));
  }

  async submit(ev) {
    ev.preventDefault();

    let amount = 0;
    this.state.list.map(({ value }) => {
      amount += value;
    });

    let { token } = await this.props.stripe.createToken({
      name: this.state.name
    });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, amount })
    });

    if (response.ok) console.log("Purchase Complete!");
    this.setState({ complete: true });
  }

  render() {
    console.log(this.state);
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <form className="checkout" style={{ textAlign: "center" }}>
        <label>Name:</label>
        <input
          type="text"
          value={this.state.name}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </form>
    );
  }
}

export default injectStripe(Payform);
