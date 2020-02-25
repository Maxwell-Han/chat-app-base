import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import LoginForm from './LoginForm'
import store from "./store";
import Home from "./home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>Hello world!</div>
      <Switch>
        <Route path="/home" component={Home} />
        <Route component={LoginForm} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("app")
);
