import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem, selectItem } from "../actions/itemActions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Product from "./Product";
import Cart from "./pay/Cart";
import Payment from "./pay/Payment";
import PropTypes from "prop-types";

class ShoppingList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  onSetClick = id => {
    console.log("selected item");
    this.props.selectItem(id);
  };

  render() {
    const { items } = this.props.item;

    console.log(this.props);

    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => (
            <Container>
              <ListGroup
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {items.map(({ _id, date, name, image }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem color="dark">
                      {
                        <div>
                          {this.props.isAuthenticated ? (
                            <Button
                              className="remove-btn"
                              color="danger"
                              size="sm"
                              onClick={this.onDeleteClick.bind(this, _id)}
                            >
                              X
                            </Button>
                          ) : null}
                          {name}
                          <br></br>
                          {date}
                          <br></br>
                          <Link
                            to="/Product"
                            onClick={this.onSetClick.bind(this, _id)}
                          >
                            <img src={image} width="200px" height="200px"></img>
                          </Link>
                        </div>
                      }
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </ListGroup>
            </Container>
          )}
        />
        <Route path="/product" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/payment" component={Payment} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { getItems, deleteItem, selectItem })(
  ShoppingList
);
