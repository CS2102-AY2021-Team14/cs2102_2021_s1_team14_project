import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./SignIn.module.css";

const SignIn = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(`Form submitted, Username: ${username}, Password: ${password}`);

      const body = { username, password };
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch(error) {
      console.error(error.message);
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
