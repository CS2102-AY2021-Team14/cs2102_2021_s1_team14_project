import React, { useState } from "react";
import { Button, Card, Badge, Modal } from "react-bootstrap";
import { MdPerson, MdPets, MdDateRange } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

import "./BidCard.css";

const BidCard = props => {
  const {
    showButtons,
    fetchBids,
    caretakerUsername,
    caretakerName,
    pet,
    petType,
    startDate,
    endDate,
    isSuccessful,
    isActive,
    paymentType,
    transferMethod,
    rating,
    reviewText,
  } = props;

  const [isCancelBidModalOpen, setIsCancelBidModalOpen] = useState(false);

  const cancelBid = () => {
    axios
      .post("/api/bids/inactive", {
        pet: pet,
        care_taker: caretakerUsername,
        start_date: startDate,
        end_date: endDate,
      })
      .then(res => {
        fetchBids();
        setIsCancelBidModalOpen(false);
        toast.success("Bid cancelled");
      })
      .catch(err => {
        console.log("Error cancelling bid", err);
        toast.error("Error cancelling bid, please try again");
      });
  };

  const getBadgeVariant = () => {
    if (isSuccessful) {
      return "success";
    } else if (isActive) {
      return "info";
    } else {
      return "secondary";
    }
  };

  // check if date is over current date to show fail too?
  const getBadgeText = () => {
    if (isSuccessful) {
      return "Successful";
    } else if (isActive) {
      return "Active";
    } else {
      return "Failed";
    }
  };

  // const isReviewable = () => {
  //   const hasReviewed = rating != null;
  //   const todaysDate = new Date().setHours(0, 0, 0, 0);
  //   return isSuccessful && !hasReviewed && endDate >= todaysDate;
  // };

  const getButtonComponent = () => {
    if (isSuccessful) {
      return (
        <Button className="button" variant="primary">
          Change Arrangement
        </Button>
      );
    } else if (isActive) {
      return (
        <Button
          className="button"
          variant="danger"
          onClick={() => setIsCancelBidModalOpen(true)}
        >
          Cancel Bid
        </Button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <Card className="bidCardContainer">
        <Card.Body className="bidCardBodyContainer">
          <Card.Title>
            Bid
            <span className="badgeContainer">
              <Badge variant={getBadgeVariant()}>{getBadgeText()}</Badge>
            </span>
          </Card.Title>
          <div>
            <div>
              <span className="iconContainer">
                <MdPerson />
              </span>
              Care Taker: {caretakerName}
            </div>
            <div>
              <span className="iconContainer">
                <MdPets />
              </span>
              Pet: {pet}
              <span className="badgeContainer">
                <Badge variant="light">{petType}</Badge>
              </span>
            </div>
            <div>
              <span className="iconContainer">
                <MdDateRange />
              </span>
              Date: {new Date(startDate).toDateString()} -{" "}
              {new Date(endDate).toDateString()}
            </div>
          </div>
          {showButtons && getButtonComponent()}
        </Card.Body>
      </Card>

      <Modal
        show={isCancelBidModalOpen}
        onHide={() => setIsCancelBidModalOpen(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel this bid?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setIsCancelBidModalOpen(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={cancelBid}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BidCard;
