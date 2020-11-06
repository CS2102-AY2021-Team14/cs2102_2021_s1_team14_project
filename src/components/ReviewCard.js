import React, { useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { MdStar, MdPerson, MdPets, MdDateRange } from "react-icons/md";

import NewReviewModal from './NewReviewModal';
import StarRatings from "react-star-ratings";

import "./BidCard.css";
import { toast } from "react-toastify";
import ReviewTextModal from "./ReviewTextModal";

const ReviewCard = props => {
  const {
    addReview,
    careTakerName,
    petName,
    petType,
    startDate,
    endDate,
    rating,
    reviewText,
  } = props;

  const [isOpen, setOpen] = useState(false);
  const [isTextOpen, setTextOpen] = useState(false);
  const [newRating, setRating] = useState(rating ? rating : 3);
  const [newReviewText, setReviewText] = useState(reviewText ? reviewText : '');

  const addReviewHandler = () => {
    if (newReviewText == '' || /^\s+$/.test(newReviewText)) {
      toast.error('Review Text Cannot be empty!');
      return;
    }

    addReview(petName, careTakerName, startDate, endDate, newRating, newReviewText);
    setOpen(false);
  };

  const canEdit = () => {
    if (!rating) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Card className="bidCardContainer">
      <Card.Body className="bidCardBodyContainer">
        <Card.Title>
          Bid
        </Card.Title>
        <div>
          <div>
            <span className="iconContainer">
              <MdPerson />
            </span>
            Care Taker: {careTakerName}
          </div>

          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet: {petName}
            <span className="badgeContainer">
              <Badge variant="light">{petType}</Badge>
            </span>
          </div>

          <div>
            <span className="iconContainer">
              <MdDateRange />
            </span>
              Date: {startDate} - {endDate}
          </div>

          {
            rating && (
              <>
                <div>
                  <span className="iconContainer">
                    <MdStar />
                  </span>
                Rating:
                <span className="badgeContainer">
                    <StarRatings
                      starDimension={24}
                      starSpacing={4}
                      starRatedColor="gold"
                      rating={rating}
                    />

                  </span>
                </div>
              </>
            )
          }

        </div>
        <Button className="button" variant="primary" disabled={!canEdit()} onClick={() => { setOpen(true); }}>
          Review
        </Button>
        <NewReviewModal addReview={addReviewHandler}
          isOpen={isOpen}
          handleClose={() => setOpen(false)}
          careTakerName={careTakerName}
          rating={newRating}
          setRating={setRating}
          reviewText={newReviewText}
          setReviewText={setReviewText}
        />

        {
          reviewText && (
            <>
              <Button className="button" variant="primary" onClick={() => { setTextOpen(true); }}>
                View Review Text
            </Button>
              <ReviewTextModal
                addReview={addReview}
                isOpen={isTextOpen}
                handleClose={() => setTextOpen(false)}
                careTakerName={careTakerName}
                rating={rating}
                setRating={setRating}
                reviewText={reviewText}
                setReviewText={setReviewText}
              />
            </>
          )
        }
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
