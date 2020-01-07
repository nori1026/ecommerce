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

import { connect } from "react-redux";
import { getItems, deleteItem, selectItem } from "../actions/itemActions";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

class Product extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  state = {
    list: [],
    check: false,
    isButtonDisabled: false
  };

  componentDidMount() {
    const self = this;

    if (this.props.isAuthenticated) {
      this.setState({
        user:
          this.props.user._id === undefined
            ? this.props.user.id
            : this.props.user._id
      });
      axios
        .get("api/counter/data", {
          params: {
            user:
              this.props.user._id === undefined
                ? this.props.user.id
                : this.props.user._id
          }
        })
        .then(res => self.setState({ list: res.data }))
        .catch(err => console.log(err));
    }

    console.log(this.state.list);
  }

  async onAdd() {
    console.log("add");

    const self = this;
    await axios
      .post(`api/counter/add`, {
        product: this.props.item.current.name,
        value: 1,
        purchaseId: this.props.item.current._id,
        user:
          this.props.user._id === undefined
            ? this.props.user.id
            : this.props.user._id
      })
      .then(res => {
        const newList = [
          ...self.state.list,
          {
            _id: res.data._id,
            product: this.props.item.current.name,
            value: 1,
            purchaseId: this.props.item.current._id,
            user:
              this.props.user._id === undefined
                ? this.props.user.id
                : this.props.user._id,
            __v: 0
          }
        ];
        self.setState({ list: newList });
      })
      .catch(err => console.log(err));

    setTimeout(() => this.setState({ isButtonDisabled: false }));
  }

  async onIncrement(count) {
    console.log("increment");
    const self = this;

    await axios
      .post(`api/counter/increment/${count.purchaseId}`, count)
      .then(res => {
        const newList = self.state.list.map(item =>
          item.purchaseId === count.purchaseId
            ? {
                product: item.product,
                _id: item._id,
                value: (item.value += 1),
                purchaseId: item.purchaseId,
                user: item.user,
                __v: 0
              }
            : item
        );

        self.setState({ list: newList });
      })
      .catch(err => console.log(err));

    setTimeout(() => this.setState({ isButtonDisabled: false }));
  }

  checkExist(cartItem) {
    console.log(cartItem);
    console.log(this.state.list);

    setTimeout(() => this.setState({ isButtonDisabled: true }));

    //initialize variable
    let check = false;
    let currentItem;
    this.state.list.map(item => {
      // check is true if current item previously purchased
      if (item.purchaseId === cartItem._id) {
        check = true;
        currentItem = item;
        console.log(currentItem);
      }
    });
    // if there is duplicate, increment existing item
    let item;
    console.log(check);
    check ? (item = this.onIncrement(currentItem)) : (item = this.onAdd());

    return item;
  }

  render() {
    const { current } = this.props.item;
    const image = this.props.item.current.image;
    console.log(this.props.item.current);
    return (
      <Container md>
        <Row>
          <Col style={{ padding: "1rem" }}>
            <Link to="/">
              <Button>Back</Button>
            </Link>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>
            <Media>
              <Media left href="#">
                <Media
                  object
                  src={this.props.item.current.image}
                  alt="Generic placeholder image"
                  style={{
                    maxHeight: 600,
                    maxWidth: 600,
                    paddingRight: "2rem"
                  }}
                />
              </Media>
              <Media body>
                <Media heading>{this.props.item.current.name}</Media>
                {this.props.item.current.date}
              </Media>
              {this.props.isAuthenticated ? (
                <Button
                  onClick={() => {
                    this.checkExist(this.props.item.current);
                  }}
                  disabled={this.state.isButtonDisabled}
                >
                  Buy
                </Button>
              ) : null}
            </Media>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { getItems, deleteItem, selectItem })(
  Product
);
