import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import { Header, Footer } from "./components";
import App from "./App";

import "./index.css";

const Index = () => (
  <div className="main">
    <HashRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  </div>
);

const root = createRoot(document.getElementById("root"));
root.render(<Index />);
