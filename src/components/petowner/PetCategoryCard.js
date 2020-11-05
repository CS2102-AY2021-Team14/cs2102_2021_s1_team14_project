import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";

const PetCategoryCard = (props) => {
  const {
    deleteCategory,
    category
  } = props;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col className="text-right" sm="4">
            Category:
                </Col>
          <Col sm="8">
            {category}
          </Col>
        </Row>

        <br />

        <Row>
          <Col className="text-right" sm="12">
            <Button size="sm" variant="danger" onClick={() => { deleteCategory(category); }}>
              Delete
                </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );

};

export default PetCategoryCard;