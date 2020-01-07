import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Product from "./components/Product";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Container>
              <ItemModal />
              <ShoppingList />
            </Container>
          </div>
        </Provider>
      </Router>
    );
  }
}

export default App;
