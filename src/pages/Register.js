import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Form submitted ${username} ${password} ${confirmPassword} ${country} ${address}`);
  }

  return (
    <div>
      <Navbar />

      <Container className="my-5">
        <h2 className={styles.title}>Register</h2>

        <Form className="mt-4 mb-3" onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label className="text-right" column sm="2">
              Username:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" placeholder="email@example.com" value={username}
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

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="text-right" column sm="2">
              Confirm Password:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintext">
            <Form.Label className="text-right" column sm="2">
              Country:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Country" value={country}
                            onChange={e => setCountry(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintext">
            <Form.Label className="text-right" column sm="2">
              Address:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" placeholder="Address" value={address}
                            onChange={e => setAddress(e.target.value)} />
            </Col>
          </Form.Group>

          <Button className={styles.button} type="submit">Register</Button>
        </Form>

        <p>
          Already have an account? Sign in&nbsp;
          <Link className={styles.link} to={ROUTES.SIGN_IN}>here</Link>
          !
        </p>
      </Container>
    </div>
  );
}

export default Register;
