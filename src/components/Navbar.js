import React from "react";
import { Navbar } from "react-bootstrap";

import logo from "../images/logo-white.png";

const Nav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand>
      <img
        alt=""
        src={logo}
        width="40"
        height="40"
        className="d-inline-block align-top mr-3"
      />
      YogaPets
    </Navbar.Brand>
  </Navbar>
);

export default Nav;
