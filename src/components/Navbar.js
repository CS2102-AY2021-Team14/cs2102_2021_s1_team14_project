import React from "react";
import { Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import logo from "../images/logo-white.png";
import ROUTES from "../routes/Routes";

const Nav = () => {
  const history = useHistory();
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand onClick={() => history.push(ROUTES.HOME)}>
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
};

export default Nav;
