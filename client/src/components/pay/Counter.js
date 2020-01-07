import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Media
} from "reactstrap";
import axios from "axios";

export default class Counter extends Component {
  render() {
    console.log(this.props.item);

    return (
      <Container>
        <Row style={{ fontSize: "20px" }}>
          <Col>{this.props.item.product}</Col>
          <Col>
            {this.props.item.value}
            <button
              className="btn btn-dark btn-outline-light  ml-4"
              onClick={() => this.props.onDecrement(this.props.item)}
            >
              -
            </button>
            <button
              className="btn btn-dark btn-outline-light ml-2"
              onClick={() => this.props.onIncrement(this.props.item)}
            >
              +
            </button>
            <button
              className="btn btn-dark btn-outline-light ml-2"
              onClick={() => this.props.onDelete(this.props.item._id)}
            >
              x
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}
