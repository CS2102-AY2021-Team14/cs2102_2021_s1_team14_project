import React from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { MdPerson, MdPets, MdDateRange } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";

import "./PetCard.css";

const PetCard = props => {
  const {
    petName,
    petType,
    petOwner,
    petOwnerName,
    petCategories,
    petSpecialRequirements,
  } = props;

  return (
    <Card className="petCardContainer">
      <Card.Body className="petCardBodyContainer">
        <Card.Title>{petName}</Card.Title>
        <div>
          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet Type: {petType}
          </div>

          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet Categories:
            <span className="badgeContainer">
              {petCategories?.map((category, index) => (
                <Badge key={index} variant="light" style={{ margin: 4 }}>
                  {category}
                </Badge>
              ))}
            </span>
          </div>

          <div>
            <span className="iconContainer">
              <MdPerson />
            </span>
            Pet Owner: {petOwnerName ?? petOwner}
          </div>

          <div>
            <span className="iconContainer">
              <FaRegStickyNote />
            </span>
            Special Requirements:
            <span className="badgeContainer">
              {petSpecialRequirements?.map((requirement, index) => (
                <Badge key={index} variant="light" style={{ margin: 4 }}>
                  {requirement}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        <Button className="button" variant="primary">
          Edit
        </Button>
        <Button className="button" variant="danger">
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
