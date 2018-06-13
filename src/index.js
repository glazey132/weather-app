import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

import rootReducer from "./ReactApp/reducers/index";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

/**
//components
**/
import Root from "./ReactApp/components/Root";

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Root store={store} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
