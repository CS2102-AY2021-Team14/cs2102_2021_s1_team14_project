import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";

import { RiAuctionFill } from "react-icons/ri";

import { MOCK_DATA } from "./PetOwnerHome";

// TODO: link with backend
const PetOwnerBids = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Bids"} />
          </Col>

          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                My Bids
              </Card.Header>
              <Card.Body>
                {MOCK_DATA.map((data, index) => (
                  <BidCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerBids;
