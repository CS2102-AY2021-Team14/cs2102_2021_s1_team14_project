import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
} from "react-bootstrap";
import { RiAuctionFill } from "react-icons/ri";

// TODO: integrate with backend
const ReviewsModal = props => {
  const { isOpen, handleClose, caretakerUsername, caretakerName } = props;

  const reviews = [
    { rating: 3.3, text: "oo" },
    { rating: 4.3, text: "aasdkasjdhaskd" },
  ]; // todo get from backend

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Reviews for {caretakerName ?? caretakerUsername}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {reviews.map((review, index) => {
            return (
              <ListGroup.Item>
                <Badge variant="info" style={{ marginRight: 10 }}>
                  {review.rating}
                </Badge>
                {review.text}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewsModal;
