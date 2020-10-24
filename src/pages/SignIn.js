import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./SignIn.module.css";

const SignIn = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(`Form submitted, Username: ${username}, Password: ${password}`);

      const body = { username, password };

      axios.post("/api/auth/login", body).then(response => {

        const token = JSON.parse(response.data).token;
        // setCurrentAuth(token);
        
        // Decode token and check for petowner/caretaker/admin

      }).catch(error => {
        toast.error(error);
      });
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
