import React from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

import StarRatings from "react-star-ratings";

const NewReviewModal = (props) => {

  const {
    addReview,
    isOpen,
    handleClose,
    careTakerName,
    rating,
    setRating,
    reviewText,
    setReviewText
  } = props;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Review for {careTakerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form className="mt-4 mb-3" onSubmit={() => { }}>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="3">
              Rating:
            </Form.Label>
            <Col>
              <StarRatings
                starDimension={24}
                starSpacing={4}
                starRatedColor="gold"
                rating={parseInt(rating)}
              />
            </Col>

            <Col style={{ margin: 'auto' }} sm="9">
              <Form.Control type="range" value={rating}
                min={1} max={5} tooltip='on'
                onChange={(e) => setRating(e.target.value)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="3">
              Description:
                    </Form.Label>
            <Col sm="9">
              <Form.Control
                as="textarea"
                value={reviewText}
                name="reviewText"
                rows={3}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </Col>
          </Form.Group>

        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
          </Button>
        <Button variant="primary" onClick={addReview}>
          Review
          </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewReviewModal;