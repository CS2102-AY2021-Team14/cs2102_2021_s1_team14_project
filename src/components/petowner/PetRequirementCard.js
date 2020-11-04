import React from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";

const PetRequirementCard = ( props ) => {
  const {
    deleteRequirement, 
    req 
  } = props;

  const {
    requirement, 
    description
  } = req;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="text-right" sm="4">
            Requirement:
                </Col>
          <Col sm="8">
            {requirement}
                </Col>
        </Row>
        <Row>
          <Col className="text-right" sm="4">
            Description:
                </Col>
          <Col sm="8">
             {description}
                </Col>
        </Row>

        <br />

        <Row>
          <Col className="text-right" sm="12">
            <Button size="sm" variant="danger" onClick={() => { deleteRequirement(requirement) }}>
              Delete
                </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

};

export default PetRequirementCard;