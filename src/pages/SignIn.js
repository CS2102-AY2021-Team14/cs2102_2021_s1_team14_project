import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./SignIn.module.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Form submitted, Username: ${username}, Password: ${password}`);

    if (username === "c@c.com" && password === "c") {
      // Caretaker
      history.push(ROUTES.CARE_TAKER_HOME);
    } else if (username === "p@p.com" && password === "p") {
      // Pet Owner
      history.push(ROUTES.PET_OWNER_HOME);
    } else if (username === "a@a.com" && password === "a") {
      // Admin
      history.push(ROUTES.ADMIN_HOME);
    }
  }

  return (
    <div>
      <Navbar />

      <Container className="my-5">
        <h2 className={styles.title}>Sign In</h2>

        <Form className="mt-4 mb-3" onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label className="text-right" column sm="2">
              Username:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Username" value={username}
                            onChange={e => setUsername(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="text-right" column sm="2">
              Password:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Password" value={password}
                            onChange={e => setPassword(e.target.value)} />
            </Col>
          </Form.Group>

          <Button className={styles.button} type="submit">Sign In</Button>
        </Form>

        <p>
          Don't have an account? Register&nbsp;
          <Link className={styles.link} to={ROUTES.REGISTER}>here</Link>
          !
        </p>
      </Container>
    </div>
  );
}

export default SignIn;
