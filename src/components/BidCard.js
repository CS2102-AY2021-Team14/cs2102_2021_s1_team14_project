import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import ROUTES from "../routes/Routes";

import "./BidCard.css";

const BidCard = props => {
  const {
    careTakerName,
    petName,
    petType,
    startDate,
    endDate,
    isSuccessful,
    isActive,
  } = props;

  const history = useHistory();

  const getBadgeVariant = () => {
    if (isSuccessful) {
      return "success";
    } else if (isActive) {
      return "info";
    } else {
      return "secondary";
    }
  };

  // check if date is over current date to show fail too?
  const getBadgeText = () => {
    if (isSuccessful) {
      return "Successful";
    } else if (isActive) {
      return "Active";
    } else {
      return "Failed";
    }
  };

  const isReviewable = () => {
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    return isSuccessful && endDate >= todaysDate;
  };

  const getButtonComponent = () => {
    if (isReviewable()) {
      return (
        <Button className="button" variant="primary">
          Review
        </Button>
      );
    } else if (isSuccessful) {
      return (
        <Button className="button" variant="primary">
          Change Arrangement
        </Button>
      );
    } else if (isActive) {
      return (
        <Button className="button" variant="primary">
          Cancel Bid
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <Card>
      <Card.Body className="container">
        <Card.Title>
          Bid
          <span className="badgeContainer">
            <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
          </span>
        </Card.Title>
        <Card.Text>
          <div>Care Taker: {careTakerName}</div>
          <div>Pet: {petName}</div>
          <div>
            Date: {startDate} - {endDate}
          </div>
        </Card.Text>
        {getButtonComponent()}
      </Card.Body>
    </Card>
  );
};

export default BidCard;
