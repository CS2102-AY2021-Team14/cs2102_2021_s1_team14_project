import React, { useState, useEffect } from "react";
import { Modal, Badge, ListGroup } from "react-bootstrap";
import axios from "axios";

// TODO: integrate with backend
const ReviewsModal = props => {
  const { isOpen, handleClose, caretakerUsername, caretakerName } = props;

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios
        .get(`/api/caretaker/${caretakerUsername}/ratings`)
        .then(res => {
          const data = res.data?.data ?? [];

          setReviews(
            data.map(review => {
              return {
                rating: parseFloat(review.rating).toFixed(2),
                text: review.review_text,
              };
            })
          );
        })
        .catch(err => console.log("Error fetching reviews", err));
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Reviews for {caretakerName ?? caretakerUsername}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {reviews.length == 0 && (
            <ListGroup.Item>No reviews for this caretaker yet</ListGroup.Item>
          )}
          {reviews.map((review, index) => {
            return (
              <ListGroup.Item key={index}>
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
