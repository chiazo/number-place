import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import { Header, Simulation, Footer } from "./components";
import App from "./App";

import "./index.css";

const Index = () => (
  <div className="main">
    <HashRouter>
      <Header />
      <Simulation />
      <div>
        <Route exact path="/" component={App} />
      </div>
      <Footer />
    </HashRouter>
  </div>
);

ReactDOM.render(<Index />, document.getElementById("root"));
