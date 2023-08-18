import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <header className="navbar navbar-expand-lg navbar-light ">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          {/* <img src={Logo} width="200" alt="Logo" /> */} logo aqui
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link mx-4" to="/quotes/new">
                Create Quote
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/quotes">
                Categories
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Nav;
