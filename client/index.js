import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>Hello world!</div>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
