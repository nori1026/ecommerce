import React, { Component } from "react";
import Counter from "./Counter";
import uuid from "uuid";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";

export default class Counters extends Component {
  render() {
    return (
      <div>
        {/* <button
          className="btn btn-dark border-light btn-outline-light ml-2 m-1"
          onClick={this.props.onAdd}
        >
          Add
        </button> */}

        <Container>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <button
                className="btn btn-dark border-light btn-outline-light ml-2 m-3"
                onClick={this.props.onReset}
              >
                Reset
              </button>
            </Col>
          </Row>

          {this.props.list.map(item => (
            <Container key={uuid()}>
              <Row>
                <Col>
                  <Counter
                    item={item}
                    onDelete={this.props.onDelete}
                    onDecrement={this.props.onDecrement}
                    onIncrement={this.props.onIncrement}
                  />
                </Col>
              </Row>
            </Container>
          ))}
        </Container>

        <Row
          sm="12"
          md={{ size: 6, offset: 3 }}
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <Col>
            <Link to="/payment">
              <Button>Buy All</Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
