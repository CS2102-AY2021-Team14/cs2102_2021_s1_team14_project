import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import logo from "../images/logo-white.png";
import ROUTES from "../routes/Routes";

import "./Navbar.css";

const NavBar = () => {
  const history = useHistory();
  return (
    <Navbar style={{backgroundColor: "#364F6B"}} variant="dark">
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
      <Nav.Item>
        <Button className="ml-auto" 
          style={{
            backgroundColor: "#fc0303",
            border: "none"
            }}>
          Logout
      </Button>
      </Nav.Item>
    </Navbar>
  );
};

export default NavBar;
