import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { MdPerson, MdPets, MdStar } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import BidModal from "./petowner/BidModal";

import "./CaretakerInfoCard.css";
import ReviewsModal from "./petowner/ReviewsModal";
import { UserContext } from "../utils/UserProvider";
import axios from "axios";

const CaretakerInfoCard = props => {
  const {
    username,
    name,
    isPartTime,
    introduction,
    petPrices, // { petType: price }
    avgRating,
  } = props;

  const { username: userUsername } = useContext(UserContext);

  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (username) {
      axios
        .get(`/api/pets/${userUsername}`)
        .then(res => {
          const data = res.data?.data ?? [];
          setPets(
            data.map(pet => {
              return {
                name: pet.pet_name,
                type: pet.pet_type,
              };
            })
          );
        })
        .catch(err => console.log("Error getting user's pets", err));
    }
  }, [username]);

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
                {Object.entries(petPrices ?? {}).map((petPrice, index) => (
                  <Badge
                    key={index}
                    variant="light"
                    style={{ margin: 4, fontSize: 16 }}
                  >
                    {petPrice[0]}: ${parseFloat(petPrice[1]).toFixed(2)} per day
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
                  starDimension={"24px"}
                  starSpacing={"4px"}
                  starRatedColor="gold"
                  rating={parseFloat(avgRating ?? 0)}
                />

                <Badge variant="light" style={{ marginLeft: 8 }}>
                  <span style={{ fontSize: 18 }}>
                    {avgRating
                      ? parseFloat(avgRating).toFixed(2)
                      : "No ratings yet"}
                  </span>
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
        pets={pets}
        careTakerPetPrices={petPrices}
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
