import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import CaretakerInfoCard from "../../components/CaretakerInfoCard";
import { FaSearch } from "react-icons/fa";

const MOCK_DATA = [
  {
    username: "usernmae",
    name: "care taker name",
    isPartTime: true,
    introduction: "Hi",
    petTypes: ["Donkey", "Cow"],
    avgRating: 5.5,
  },
  {
    username: "usernmae",
    name: "care taker name",
    isPartTime: false,
    introduction: "Hi, please pick me to care for your dinosaurs!",
    petTypes: ["Elephant", "Dinosaur", "Horse"],
    avgRating: 5.5,
  },
];

const PetOwnerSearch = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Search"} />
          </Col>

          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <FaSearch />
                </span>
                Search for Care Takers
              </Card.Header>

              <Card.Body>
                {MOCK_DATA.map((data, index) => (
                  <CaretakerInfoCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerSearch;
