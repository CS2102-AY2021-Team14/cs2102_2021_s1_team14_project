import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";

const PetOwnerSearch = () => {
  let isPetOwner;
  async function getRole() {
    try {
      const response = await fetch("/api/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      isPetOwner = parseRes.user_role === "OWNER";
      // console.log(parseRes.user_role.toString());
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getRole();
  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={9} id="page-content">
            Page Content Goes Into Here.
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerSearch;
