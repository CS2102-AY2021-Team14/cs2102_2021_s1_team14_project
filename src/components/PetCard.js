import React from "react";
import { Button, Card, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import { MdPerson, MdPets } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";

import "./PetCard.css";

const PetCard = props => {
  const {
    deletePet, 
    petName,
    petType,
    petOwner,
    petOwnerName,
    petCategories,
    petSpecialRequirements,
  } = props;

  const deleteWarning = (
    <Popover id="popover-basic">
      <Popover.Title>
        <h3> Warning! </h3>
      </Popover.Title>
      <Popover.Content>
        <p>
        Are you sure you want to delete this pet? 
        This action is <strong>irreversible</strong>!
         </p>

        <Button className="button" variant="danger" onClick={() => deletePet(petName)}>
          Remove
        </Button>
        <Button className="button" variant="secondary" onClick={() => document.body.click()}>
          Cancel
        </Button>
      </Popover.Content>
    </Popover>
  );
  

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
        <OverlayTrigger trigger="click" placement="top" overlay={deleteWarning} rootClose >
        <Button className="button" variant="danger" >
          Remove
        </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
