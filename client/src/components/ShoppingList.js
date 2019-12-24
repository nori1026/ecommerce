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
import { getItems, deleteItem } from "../actions/itemActions";

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

  render() {
    const { items } = this.props.item;

    console.log(items);

    return (
      <Container>
        <ListGroup
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TransitionGroup className="shopping-list">
            {this.props.isAuthenticated
              ? items.map(({ _id, date, name, image }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem color="dark">
                      {
                        <div>
                          <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick={this.onDeleteClick.bind(this, _id)}
                          >
                            X
                          </Button>
                          {name}
                          <br></br>
                          {date}
                          <br></br>
                          <img src={image} width="200px" height="200px"></img>
                        </div>
                      }
                    </ListGroupItem>
                  </CSSTransition>
                ))
              : null}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);
