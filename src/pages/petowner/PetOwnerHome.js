import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";

const PetOwnerHome = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={9} id="page-content">
            <Col>
              <BidCard />
            </Col>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerHome;
