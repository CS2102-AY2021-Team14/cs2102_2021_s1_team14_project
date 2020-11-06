import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";

import { RiAuctionFill } from "react-icons/ri";

// TODO: link with backend
export const MOCK_DATA = [
  {
    caretakerName: "care taker",
    pet: "meowzers",
    petType: "Cat",
    startDate: "20 Oct 2020",
    endDate: "22 Oct 20202",
    isSuccessful: true,
    isActive: true,
  },
  {
    caretakerName: "care taker 2",
    pet: "doggo",
    petType: "Dog",
    startDate: "23 Oct 2020",
    endDate: "29 Oct 20202",
    isSuccessful: false,
    isActive: true,
  },
  {
    caretakerName: "care taker three 3",
    pet: "snek",
    petType: "Snake",
    startDate: "03 Nov 2020",
    endDate: "19 Nov 2020",
    isSuccessful: false,
    isActive: false,
  },
];

const PetOwnerHome = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Home"} />
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                Bids Overview
              </Card.Header>
              <Card.Body>
                {MOCK_DATA.map((data, index) => (
                  <BidCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                Care Taker Status
              </Card.Header>
              <Card.Body>
                {/* TODO CareTakerBidStatusCard? */}
                {MOCK_DATA.map((data, index) => (
                  <BidCard {...data} key={index} showButtons={false} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerHome;
