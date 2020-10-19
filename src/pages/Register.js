import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ROUTES from "../routes/Routes";

import styles from "./Register.module.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    address: "",
    role: ""
  });

  const { email, 
        password, 
        confirmPassword, 
        country, 
        address,
        role } = inputs;

  const onChange = (event) => {
    setInputs({...inputs, [event.target.name]
                        : event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
      confirmPassword,
      country,
      address,
      role
    };

    console.log(`Form submitted ${email} ${password} ${confirmPassword} ${country} ${address}`);
  }

  return (
    <div>
      <Navbar />

      <Container className="my-5">
        <h2 className={styles.title}>Register</h2>

        <Form className="mt-4 mb-3" onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label className="text-right" column sm="2">
              Email:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="email" 
                            placeholder="email@example.com" 
                            value={email}
                            name="email"
                            onChange={e => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="text-right" column sm="2">
              Password:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" 
                            placeholder="Password" 
                            value={password}
                            name="password"
                            onChange={e => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label className="text-right" column sm="2">
              Confirm Password:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={e => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintext">
            <Form.Label className="text-right" column sm="2">
              Country:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" 
                            placeholder="Country" 
                            value={country}
                            name="country"
                            onChange={e => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintext">
            <Form.Label className="text-right" column sm="2">
              Address:
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" 
                            placeholder="Address" 
                            value={address}
                            name="address"
                            onChange={e => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDropdown">
            <Form.Label className="text-right" column sm="2">
              Role:
            </Form.Label>
            <Col sm="10">
            <Form.Control as="select" name="role" onChange={e => onChange(e)}>
              <option value="ADMIN">ADMIN</option>
              <option value="CARETAKER">CARETAKER</option>
              <option value="OWNER">OWNER</option>
            </Form.Control>
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
