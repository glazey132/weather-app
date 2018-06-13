import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "../ReactApp/Containers/App";

//smoke test checks for app rendering with no thrown errors from children
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

//test is a shallow test of App component
it("renders without crashing", () => {
  shallow(<App />);
});
