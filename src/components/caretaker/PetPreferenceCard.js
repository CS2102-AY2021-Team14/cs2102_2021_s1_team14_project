import React from "react";
import { Button, Card, Row, Col } from 'react-bootstrap';
import PET_TYPES from "../../utils/PetTypes";

const PetPreferenceCard = (props) => {
  const {
    petType,
    petTypes,
    addPetType
  } = props;

  const is_added = petTypes.includes(petType.toLowerCase());

  return (
    <Card>
      <Card.Body>
        <h3> {petType} </h3>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col>
            <Button onClick={() => addPetType(petType.toLowerCase())} disabled={is_added}>
              Add
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
};

export default PetPreferenceCard;