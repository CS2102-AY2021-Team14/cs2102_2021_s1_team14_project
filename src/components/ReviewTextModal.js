import React from "react";
import { Card, Badge, Button, Form, Modal, Row, Col } from "react-bootstrap";

import { MdStar, MdPerson, MdPets, MdDateRange } from "react-icons/md";
import StarRatings from "react-star-ratings";

const ReviewTextModal = (props) => {

  const {
    isOpen,
    handleClose,
    careTakerName,
    rating,
    reviewText
  } = props;

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review for {careTakerName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Card >

          <Row>
            <Col className="text-right" sm="3">
              <MdStar />                 Rating:
            </Col>
            <Col sm="9">
              <spcan>
              </spcan>
              <span>
                <StarRatings
                  starDimension={24}
                  starSpacing={4}
                  starRatedColor="gold"
                  rating={rating}
                />
              </span>
            </Col>
          </Row>

          <br />

          <Row>
            <Col className="text-right" sm="3">
              Description:
                </Col>
            <Col sm="9">
              {reviewText}
            </Col>
          </Row>

        </Card>

      </Modal.Body>
    </Modal>
  );
};

export default ReviewTextModal;