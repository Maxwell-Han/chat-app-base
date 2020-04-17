import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import history from "./history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import App from "./App";
// import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "shards-ui/dist/css/shards.min.css";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import "./socket";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </Router>
  </Provider>,
  document.getElementById("app")
);
