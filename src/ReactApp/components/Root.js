import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import App from "../App";

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="root-container">
          <Route path="/" component={App} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;
