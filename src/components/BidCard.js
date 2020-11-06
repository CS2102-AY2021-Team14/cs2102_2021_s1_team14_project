import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { MdPerson, MdPets, MdDateRange } from "react-icons/md";

import "./BidCard.css";

const BidCard = props => {
  const {
    showButtons,
    caretakerUsername,
    caretakerName,
    pet,
    petType,
    startDate,
    endDate,
    isSuccessful,
    isActive,
    paymentType,
    transferMethod,
    rating,
    reviewText,
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
    const hasReviewed = rating != null;
    const todaysDate = new Date().setHours(0, 0, 0, 0);
    return isSuccessful && !hasReviewed && endDate >= todaysDate;
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
    <Card className="bidCardContainer">
      <Card.Body className="bidCardBodyContainer">
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
            Care Taker: {caretakerName}
          </div>
          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet: {pet}
            <span className="badgeContainer">
              <Badge variant="light">{petType}</Badge>
            </span>
          </div>
          <div>
            <span className="iconContainer">
              <MdDateRange />
            </span>
            Date: {new Date(startDate).toDateString()} -{" "}
            {new Date(endDate).toDateString()}
          </div>
        </div>
        {showButtons && getButtonComponent()}
      </Card.Body>
    </Card>
  );
};

export default BidCard;
