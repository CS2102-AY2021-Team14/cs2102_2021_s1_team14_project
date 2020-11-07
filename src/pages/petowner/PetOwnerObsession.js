import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import { Typography } from "@material-ui/core";
import axios from "axios";

const PetOwnerObsession = props => {
  const { username } = props;
  const [obsession, setObsession] = useState("");

  const getObsession = async () => {
    const body = { owner: username };
    axios.post("/api/petowner/obsession", body).then(response => {
      setObsession(response.data.result[0].obsessed_caretaker);
    });
  };

  useEffect(() => {
    getObsession();
  });

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Obsession"} />
          </Col>
          <Col xs={9} id="page-content">
            <Typography className="mt-3" variant="h3">
              Obsession
            </Typography>

            <Typography className="mt-3">
              {obsession === "no_obsession"
                ? "You are not obsessed with anyone!"
                : "You are obsessed with " + obsession + "!"}
            </Typography>

            <Typography className="mt-5" variant="h5">
              How obsession is calculated:
            </Typography>

            <p className="mt-3">
              You are obsessed with a caretaker if there exists a unique
              caretaker with the highest number of successful bids.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerObsession;
