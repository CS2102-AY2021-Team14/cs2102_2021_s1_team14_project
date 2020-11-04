import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";

const PetOwnerCaretakers = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Caretakers"} />
          </Col>
          <Col xs={9} id="page-content">
            Pet Owner Caretakers page Content Goes Into Here. test
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerCaretakers;
