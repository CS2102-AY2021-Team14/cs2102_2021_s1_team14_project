import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";
import { UserContext } from "../../utils/UserProvider";
import axios from "axios";

import { RiAuctionFill } from "react-icons/ri";

// TODO: link with backend
export const MOCK_DATA = [
  {
    caretakerName: "care taker",
    pet: "meowzers",
    petType: "Cat",
    startDate: "20 Oct 2020",
    endDate: "22 Oct 20202",
    isSuccessful: true,
    isActive: true,
  },
  {
    caretakerName: "care taker 2",
    pet: "doggo",
    petType: "Dog",
    startDate: "23 Oct 2020",
    endDate: "29 Oct 20202",
    isSuccessful: false,
    isActive: true,
  },
  {
    caretakerName: "care taker three 3",
    pet: "snek",
    petType: "Snake",
    startDate: "03 Nov 2020",
    endDate: "19 Nov 2020",
    isSuccessful: false,
    isActive: false,
  },
];

const PetOwnerHome = () => {
  const { username } = useContext(UserContext);

  const [bids, setBids] = useState([]);

  const fetchBids = () => {
    axios
      .get(`/api/bids/owner/${username}`)
      .then(res => {
        const data = res.data?.data;

        const fetchedBids = data?.map(bidObj => {
          const {
            care_taker,
            care_taker_name,
            pet,
            pet_type,
            start_date,
            end_date,
            is_successful,
            is_active,
            payment_type,
            transfer_method,
            rating,
            review_text,
          } = bidObj;

          return {
            caretakerUsername: care_taker,
            caretakerName: care_taker_name,
            pet,
            petType: pet_type,
            startDate: start_date,
            endDate: end_date,
            isSuccessful: is_successful,
            isActive: is_active,
            paymentType: payment_type,
            transferMethod: transfer_method,
            rating,
            reviewText: review_text,
          };
        });

        setBids(
          fetchedBids.sort((a, b) => {
            const dateDiff =
              new Date(a.startDate).setHours(0, 0, 0, 0) -
              new Date(b.startDate).setHours(0, 0, 0, 0);
            if (dateDiff !== 0) {
              return dateDiff;
            } else {
              return a.caretakerUsername - b.caretakerUsername;
            }
          }) ?? []
        );
      })
      .catch(err => console.log("Error fetching pet owner's bids", err));
  };

  useEffect(() => {
    if (username) {
      fetchBids();
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Home"} />
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                Bids Overview
                <br />
                (Up to 5 Upcoming Bids,
                <br />
                visit the Bids tab to view yours bids)
              </Card.Header>
              <Card.Body>
                {bids.slice(0, Math.min(bids.length, 5)).map((data, index) => (
                  <BidCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                Care Taker Status
              </Card.Header>
              <Card.Body>
                {/* TODO CareTakerBidStatusCard? */}
                {MOCK_DATA.map((data, index) => (
                  <BidCard {...data} key={index} showButtons={false} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerHome;
