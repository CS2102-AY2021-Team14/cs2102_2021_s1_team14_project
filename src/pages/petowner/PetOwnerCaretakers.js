import React, { useState, useEffect } from "react";
import { Card, Container, ToggleButtonGroup, ToggleButton, Row, Col } from "react-bootstrap";

import { toast } from "react-toastify";
import axios from "axios";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";

import ReviewCard from "../../components/ReviewCard";
import { mapBidInfoToBidData } from "../../utils/BidsHelper";

const PetOwnerCaretakers = (props) => {

  const { username } = props;

  const [filterStatus, setFilterStatus] = useState(1);
  const [dbReviews, setDBReviews] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getReviews = async () => {
    axios
      .get(`/api/bids/reviews/${username}`)
      .then(response => {
        const reviews = response.data.data.map(rev => mapBidInfoToBidData(rev));
        setDBReviews(reviews);
        const actualReviews = reviews.filter(review => review.reviewText == null);
        console.log(actualReviews);
        setReviews(actualReviews);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const changeView = (newFilter) => {
    setFilterStatus(newFilter);
    if (filterStatus === 1) {
      const actualReviews = dbReviews.filter(review => review.reviewText == null);
      setReviews(actualReviews);
    } else {
      const actualReviews = dbReviews.filter(review => review.reviewText != null);
      setReviews(actualReviews);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

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
