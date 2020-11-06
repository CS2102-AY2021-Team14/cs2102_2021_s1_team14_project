import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";
import axios from "axios";
import { UserContext } from "../../utils/UserProvider";

import { RiAuctionFill } from "react-icons/ri";

import { MOCK_DATA } from "./PetOwnerHome";

const PetOwnerBids = () => {
  const { username } = useContext(UserContext);

  const [bids, setBids] = useState([]);

  useEffect(() => {
    if (username) {
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

          setBids(fetchedBids ?? []);
        })
        .catch(err => console.log("Error fetching pet owner's bids", err));
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Bids"} />
          </Col>

          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <RiAuctionFill />
                </span>
                My Bids
              </Card.Header>
              <Card.Body>
                {bids.map((data, index) => (
                  <BidCard {...data} key={index} showButtons />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerBids;
