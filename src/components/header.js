import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="masthead">
      <Link to="/">
        <h1 className="site-title">number-place</h1>
      </Link>
    </div>
  );
};

export default Header;
