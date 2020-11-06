import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import BidCard from "../../components/BidCard";
import axios from "axios";
import { UserContext } from "../../utils/UserProvider";

import { RiAuctionFill } from "react-icons/ri";

const PetOwnerBids = () => {
  const { username } = useContext(UserContext);

  const [bids, setBids] = useState([]);

  const [filterStatus, setFilterStatus] = useState(1);
  const [shownBids, setShownBids] = useState([]);

  const changeView = newFilter => {
    setFilterStatus(newFilter);
    if (filterStatus === 1) {
      setShownBids(bids.filter(bid => bid.isActive && !bid.isSuccessful));
    } else if (filterStatus === 2) {
      setShownBids(bids.filter(bid => bid.isSuccessful));
    } else {
      setShownBids(bids.filter(bid => !bid.isActive && !bid.isSuccessful));
    }
  };

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

  useEffect(() => changeView(filterStatus), [bids]);

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
              <Card.Header>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                  <ToggleButton
                    style={{ width: "20vw" }}
                    value={1}
                    onClick={() => changeView(1)}
                  >
                    Pending
                  </ToggleButton>
                  <ToggleButton
                    style={{ width: "20vw" }}
                    value={2}
                    onClick={() => changeView(2)}
                  >
                    Accepted
                  </ToggleButton>
                  <ToggleButton
                    style={{ width: "20vw" }}
                    value={3}
                    onClick={() => changeView(3)}
                  >
                    Rejected/Cancelled
                  </ToggleButton>
                </ToggleButtonGroup>
              </Card.Header>

              <Card.Body>
                {shownBids.length === 0 && "No bids with this status"}
                {shownBids.map((data, index) => (
                  <BidCard
                    {...data}
                    key={index}
                    showButtons
                    fetchBids={fetchBids}
                  />
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
