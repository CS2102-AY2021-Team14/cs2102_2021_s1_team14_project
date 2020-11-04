import React from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";

const EditPetRequirementCard = (props) => {
  const {
    requirement,
    description,
    onChange,
    addRequirementHandler
  } = props;

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={() => { }}>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="4">
              Requirement:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={requirement}
                name="requirement"
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="4">
              Description:
                    </Form.Label>
            <Col sm="8">
              <Form.Control
                as="textarea"
                value={description}
                name="description"
                rows={3}
                onChange={onChange}
              />
            </Col>
          </Form.Group>
        </Form>

        <Row >
          <Col className="text-right" sm="12">
            <Button variant="primary" onClick={addRequirementHandler}>
              Add a New Requirement
             </Button>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )


};

export default EditPetRequirementCard;