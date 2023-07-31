import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <nav
        style={{ justifyContent: "space-evenly" }}
        className="navbar navbar-expand-lg navbar-light"
      >
        <a
          style={{ position: "absolute", left: "30px" }}
          className="navbar-brand"
          href="#"
        >
          Task Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          style={{ justifyContent: "space-evenly" }}
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Ongoing Tasks <span className="sr-only">(current)</span>
              </a>
            </li>
            <li
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
              className="nav-item"
            >
              <a className="nav-link" href="#">
                Done
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              style={{ position: "absolute", right: "250px", top: "10px" }}
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
