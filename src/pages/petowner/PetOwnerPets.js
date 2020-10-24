import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import PetCard from "../../components/PetCard";

import { MdPets } from "react-icons/md";

const MOCK_DATA = [
  {
    petName: "kittieee",
    petType: "Cat",
    petOwner: "owner username",
    petOwnerName: "owner name",
    petCategories: ["Small Cat", "Four-legged"],
    petSpecialRequirements: [
      "Requires 10 feedings per day",
      "Only eats $100 cat food",
      "Hates rats",
    ],
  },
  {
    petName: "doggow00f",
    petType: "Dog",
    petOwner: "owner2 username",
    petOwnerName: "owner2 name",
    petCategories: ["Big Dog", "Chihuahua"],
    petSpecialRequirements: ["Needs collar"],
  },
];

const PetOwnerPets = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Pets"} />
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <MdPets />
                </span>
                My Pets
              </Card.Header>
              <Card.Body>
                {MOCK_DATA.map((data, index) => (
                  <PetCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerPets;
