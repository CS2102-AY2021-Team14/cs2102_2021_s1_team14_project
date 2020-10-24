import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import logo from "../images/logo.png";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./Home.module.css";

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <Navbar />
      <Container>
        <img className={styles.image} src={logo} alt="YogaPets" />

        <h2 className={styles.title}>
          Your one-stop solution for pet-caring services.
        </h2>

        <Row className="justify-content-md-center">
          <Col xs lg="4">
            <Button
              className={styles.signUpButton}
              variant="primary"
              onClick={() => history.push(ROUTES.SIGN_IN)}
            >
              Sign In
            </Button>
          </Col>
          <Col xs lg="4">
            <Button
              className={styles.registerButton}
              variant="primary"
              onClick={() => history.push(ROUTES.REGISTER)}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
