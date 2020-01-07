import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import Counters from "./Counters";
import axios from "axios";
import { Elements, StripeProvider } from "react-stripe-elements";
import { connect } from "react-redux";
import { getItems } from "../../actions/itemActions";

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    const self = this;
    axios
      .get("api/counter/data", {
        params: {
          user:
            self.props.user._id === undefined
              ? self.props.user.id
              : self.props.user._id
        }
      })
      .then(res => (self.setState({ list: res.data }), console.log(res.data)))
      .catch(err => console.log(err));
  }

  onDelete = id => {
    const self = this;
    axios.delete(`api/counter/delete/${id}`);

    const newList = this.state.list.filter(item => item._id !== id);
    console.log(newList);
    this.setState({ list: newList });

    console.log(id);
  };

  onIncrement = count => {
    const self = this;
    axios
      .post(`api/counter/increment/${count._id}`, count)
      .then(res => {
        console.log("increment");
        const newList = self.state.list.map(item =>
          item._id === count._id
            ? {
                product: item.product,
                _id: item._id,
                value: (item.value += 1),
                user: item.user,
                __v: 0
              }
            : item
        );

        self.setState({ list: newList });
      })
      .catch(err => console.log(err));
  };

  onDecrement = count => {
    const self = this;
    axios
      .post(`api/counter/decrement/${count._id}`, count)
      .then(res => {
        console.log("decrement");
        const newList = self.state.list.map(item =>
          item._id === count._id
            ? {
                product: item.product,
                _id: item._id,
                value: (item.value -= 1),
                user: item.user,
                __v: 0
              }
            : item
        );

        self.setState({ list: newList });
      })
      .catch(err => console.log(err));
  };

  onReset = () => {
    console.log("reset");

    axios.post(`api/counter/reset`).then(res => console.log(res));

    const newList = this.state.list.map(item => ({
      product: item.product,
      _id: item._id,
      value: 0
    }));

    console.log(newList);
    this.setState({ list: newList });
  };

  render() {
    return (
      <Container>
        <Link to="/">
          <Button>Back</Button>
        </Link>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 style={{ textAlign: "center" }}>Cart</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Counters
              list={this.state.list}
              onDelete={this.onDelete}
              onDecrement={this.onDecrement}
              onIncrement={this.onIncrement}
              onReset={this.onReset}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,

  user: state.auth.user
});

export default connect(mapStateToProps, { getItems })(Cart);
