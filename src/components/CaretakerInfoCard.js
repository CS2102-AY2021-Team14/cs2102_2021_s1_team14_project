import React, { useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { MdPerson, MdPets, MdStar } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import BidModal from "./petowner/BidModal";

import "./CaretakerInfoCard.css";
import ReviewsModal from "./petowner/ReviewsModal";

const CaretakerInfoCard = props => {
  const {
    username,
    name,
    isPartTime,
    introduction,
    petTypes,
    avgRating,
  } = props;

  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <Card className="bidCardContainer">
        <Card.Body className="bidCardBodyContainer">
          <Card.Title>
            {name ?? username}
            <span className="badgeContainer">
              <Badge variant={isPartTime ? "warning" : "info"}>
                {isPartTime ? "Part-timer" : "Full-timer"}
              </Badge>
            </span>
          </Card.Title>
          <div>
            {introduction && (
              <div>
                <span className="iconContainer">
                  <MdPerson />
                </span>
                {introduction}
              </div>
            )}

            <div>
              <span className="iconContainer">
                <MdPets />
              </span>
              Cares for:
              <span className="badgeContainer">
                {petTypes?.map((type, index) => (
                  <Badge key={index} variant="light" style={{ margin: 4 }}>
                    {type}
                  </Badge>
                ))}
              </span>
            </div>

            <div>
              <span className="iconContainer">
                <MdStar />
              </span>
              Ratings:
              <span className="badgeContainer">
                <StarRatings
                  starDimension={24}
                  starSpacing={4}
                  starRatedColor="gold"
                  rating={avgRating}
                />

                <Badge variant="light" style={{ marginLeft: 8 }}>
                  <span style={{ fontSize: 20 }}>{avgRating}</span>
                </Badge>
              </span>
            </div>
          </div>

          <div>
            <Button
              className="button"
              variant="success"
              onClick={() => setIsBidModalOpen(true)}
            >
              <RiAuctionFill style={{ marginRight: 14 }} />
              Bid
            </Button>
            <Button
              className="button"
              variant="primary"
              onClick={() => setIsReviewModalOpen(true)}
            >
              View Reviews
            </Button>
          </div>
        </Card.Body>
      </Card>

      <BidModal
        isOpen={isBidModalOpen}
        handleClose={() => setIsBidModalOpen(false)}
        caretakerUsername={username}
        caretakerName={name}
      />

      <ReviewsModal
        isOpen={isReviewModalOpen}
        handleClose={() => setIsReviewModalOpen(false)}
        caretakerUsername={username}
        caretakerName={name}
      />
    </>
  );
};

export default CaretakerInfoCard;
