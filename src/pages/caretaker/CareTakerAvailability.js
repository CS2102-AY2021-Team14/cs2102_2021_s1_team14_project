import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Avatar from '../../components/avatar/Avatar';
import Navbar from '../../components/Navbar';
import Job from '../../components/job/Job';
import Calendar from '../../components/availability/Calendar';

import Image from '../../images/logo.png';
import { toast } from 'react-toastify';
import axios from 'axios';

const CareTakerAvailability = (props) => {


  useEffect(() => {

  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={2} id="sidebar">
            <CaretakerSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={10} id="availability">
            Hello
                    </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CareTakerAvailability;
