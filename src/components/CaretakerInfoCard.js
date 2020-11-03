import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { MdPerson, MdPets } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";

import "./CaretakerInfoCard.css";

const CaretakerInfoCard = props => {
  const {
    username,
    name,
    isPartTime,
    introduction,
    petTypes,
    avgRating,
  } = props;

  return (
    <Card className="bidCardContainer">
      <Card.Body className="bidCardBodyContainer">
        <Card.Title>
          {name}
          <span className="badgeContainer">
            <Badge variant={isPartTime ? "warning" : "info"}>
              {isPartTime ? "Part-timer" : "Full-timer"}
            </Badge>
          </span>
        </Card.Title>
        <div>
          {introduction && (
            <div>
              <span className="iconContainer">
                <MdPerson />
              </span>
              {introduction}
            </div>
          )}

          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Cares for:
            <span className="badgeContainer">
              {petTypes?.map((type, index) => (
                <Badge key={index} variant="light" style={{ margin: 4 }}>
                  {type}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        <div>
          <Button className="button" variant="success">
            <RiAuctionFill style={{ marginRight: 14 }} />
            Bid
          </Button>
          <Button className="button" variant="primary">
            View Reviews
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CaretakerInfoCard;
