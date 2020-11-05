import React, { useContext } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import logo from "../images/logo-white.png";
import ROUTES from "../routes/Routes";

import { UserContext } from "../utils/UserProvider";

import "./Navbar.css";

const NavBar = () => {
  const history = useHistory();

  const { authToken, setUsername, setAuthToken, setRoles } = useContext(UserContext);

  const logout = () => {
    setUsername(null);
    setAuthToken(null);
    setRoles([]);

    history.push(ROUTES.HOME);
  };

  const logoutButton =  ( authToken ? <Nav.Item>
    <Button
      className="ml-auto"
      style={{
        backgroundColor: "#fc0303",
        border: "none",
      }}
      onClick={logout}
    >
      Logout
    </Button>
  </Nav.Item> : null );

  return (
    <Navbar style={{ backgroundColor: "#364F6B" }} variant="dark">
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
        {logoutButton}
    </Navbar>
  );
};

export default NavBar;
