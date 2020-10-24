import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MdPerson, MdPets, MdDateRange } from "react-icons/md";

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
        <Button className="button" variant="danger">
          Cancel Bid
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <Card className="container">
      <Card.Body className="bodyContainer">
        <Card.Title>
          Bid
          <span className="badgeContainer">
            <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
          </span>
        </Card.Title>
        <div>
          <div>
            <span className="iconContainer">
              <MdPerson />
            </span>
            Care Taker: {careTakerName}
          </div>
          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet: {petName}
            <span className="badgeContainer">
              <Badge variant="light">{petType}</Badge>
            </span>
          </div>
          <div>
            <span className="iconContainer">
              <MdDateRange />
            </span>
            Date: {startDate} - {endDate}
          </div>
        </div>
        {getButtonComponent()}
      </Card.Body>
    </Card>
  );
};

export default BidCard;
