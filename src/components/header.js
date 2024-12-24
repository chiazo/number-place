import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const pages = [
    // { name: "Home", path: "/" },
    // { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="masthead">
      <Link to="/">
        <h1 className="site-title">swap-clothes</h1>
      </Link>
      <div className="nav-links">
        {pages.map(({ name, path }) => (
          <Link to={path}>
            <li className="nav-item">{name}</li>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
