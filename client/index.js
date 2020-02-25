import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store from './store'
import Home from './home'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <div>Hello world!</div>
    <Home />
  </Provider>,
  document.getElementById("app")
);
