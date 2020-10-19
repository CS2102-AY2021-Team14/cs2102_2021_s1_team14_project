import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";

const PetOwnerHome = () => {
  // const history = useHistory();

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={9} id="page-content">
            Page Content Goes Into Here. 
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PetOwnerHome;
