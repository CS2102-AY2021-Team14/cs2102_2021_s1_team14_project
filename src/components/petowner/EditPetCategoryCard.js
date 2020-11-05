import React from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

const EditPetCategoryCard = (props) => {
  const {
    category,
    onChange,
    addCategoryHandler
  } = props;

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={() => { }}>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="4">
              Category:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={category}
                name="category"
                onChange={onChange}
              />
            </Col>
          </Form.Group>
        </Form>

        <Row >
          <Col className="text-right" sm="12">
            <Button variant="primary" onClick={addCategoryHandler}>
              Add a New Category
             </Button>
          </Col>
        </Row>

      </Card.Body>
    </Card>
  )


};

export default EditPetCategoryCard;