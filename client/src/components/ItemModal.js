import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      file: {}
    };

    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpload = e => {
    const file = e.target.files[0];

    // User cancelled
    if (!file) {
      return;
    }

    this.setState({
      file: e.target.files[0]
    });
  };

  onSubmit = e => {
    console.log("submitted");
    e.preventDefault();

    const data = new FormData();
    data.append("name", this.state.name);
    data.append("image", this.state.file);

    // Add item via addItem action
    this.props.addItem(data);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button
              color="dark"
              style={{ marginBottom: "2rem" }}
              onClick={this.toggle}
            >
              Add Item
            </Button>
          </div>
        ) : (
          <h4 className="mb-3 ml-4">Please log in to manage items</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Label for="file">upload</Label>
                <Input
                  type="file"
                  name="image"
                  id="file"
                  placeholder="Add shopping item image"
                  onChange={this.onUpload}
                />

                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
