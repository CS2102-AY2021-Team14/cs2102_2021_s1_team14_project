import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import CaretakerInfoCard from "../../components/CaretakerInfoCard";
import { FaSearch } from "react-icons/fa";
import PET_TYPES from "../../utils/PetTypes";

const MOCK_DATA = [
  {
    username: "username 1",
    name: "care taker name",
    isPartTime: true,
    introduction: "Hi",
    petTypes: ["Donkey", "Cow"],
    avgRating: 4.5,
  },
  {
    username: "bob",
    name: "care taker bob",
    isPartTime: false,
    introduction: "Hi, please pick me to care for your dinosaurs!",
    petTypes: ["Elephant", "Dinosaur", "Horse"],
    avgRating: 2.5,
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
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for Care Takers"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>

                <div key="inline-checkbox" className="mb-3">
                  <span style={{ marginRight: 10 }}>Care Taker type: </span>
                  <Form.Check
                    inline
                    label="Full-timers"
                    type="checkbox"
                    id="full-timers"
                  />
                  <Form.Check
                    inline
                    label="Part-timers"
                    type="checkbox"
                    id="part-timers"
                  />
                </div>

                <div key="inline-checkbox" className="mb-3">
                  <span style={{ marginRight: 10 }}>Pet types: </span>
                  {PET_TYPES.map((petType, index) => {
                    return (
                      <Form.Check
                        key={index}
                        inline
                        label={petType}
                        type="checkbox"
                        id={petType}
                      />
                    );
                  })}
                </div>

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
