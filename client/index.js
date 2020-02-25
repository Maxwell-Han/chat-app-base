import React from "react";
import ReactDOM from "react-dom";
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <div>Hello, world!</div>
  </Provider>,
  document.getElementById("app")
);
