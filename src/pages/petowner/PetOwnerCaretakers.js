import React, { useState, useEffect } from "react";
import { Card, Container, ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";

import ReviewCard from "../../components/ReviewCard";

const MOCK_DATA = [
  {
    careTakerName: "care taker",
    petName: "meowzers",
    petType: "Cat",
    startDate: "20 Oct 2020",
    endDate: "22 Oct 20202",
    isSuccessful: true,
    isActive: false,
    rating: undefined,
    reviewText: undefined,
  },
];

const MOCK_DATA_2 = [
  {
    careTakerName: "care taker",
    petName: "woofers",
    petType: "Dog",
    startDate: "20 Oct 2020",
    endDate: "22 Oct 20202",
    isSuccessful: true,
    isActive: false,
    rating: 3,
    reviewText: 'Hello World',
  },
];

const PetOwnerCaretakers = () => {

  const [filterStatus, setFilterStatus] = useState(1);
  const [reviews, setReviews] = useState(MOCK_DATA);

  const changeView = (newFilter) => {
    setFilterStatus(newFilter);
    if (filterStatus === 1) {
      setReviews(MOCK_DATA);
    } else {
      setReviews(MOCK_DATA_2);
    }
  };

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Caretakers"} />
          </Col>
          <Col xs={9} id="page-content">
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                  <ToggleButton style={{ width: '20vw' }} value={1} onClick={() => changeView(1)} >Pending Review</ToggleButton>
                  <ToggleButton style={{ width: '20vw' }} value={2} onClick={() => changeView(2)} >Reviewed</ToggleButton>
                </ToggleButtonGroup>
              </Card.Header>
              <Card.Body>
                <Card>
                  {reviews.map((data, index) => (
                    <ReviewCard {...data} key={index} />
                  ))}
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerCaretakers;
