import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Avatar from '../../components/avatar/Avatar';
import Navbar from '../../components/Navbar';
import Job from '../../components/job/Job';
import Calendar from '../../components/availability/Calendar';

import Image from '../../images/logo.png';

const CareTakerHome = () => {

    // TODO use API calls
    const caretaker = {
        name: "Jan Low",
        image: Image,
        job: "Full-time",
        join: "18/09/2020",
        salary: "$2374.23",
        employment: "EMPLOYED",
        jobs: [
            {
                owner: "JanLu",
                pet: "Hippopotamus",
                start: "01/06/1999",
                end: "30/06/2002"
            },
            {
                owner: "SanLo",
                pet: "Sonic the Hedgehog",
                start: "02/06/1999",
                end: "29/06/2002"
            }
        ],
        availability: {
            leaveDays: [
                new Date(2020, 8, 22),
                new Date(2020, 8, 28),
                new Date(2020, 8, 29),
                new Date(2020, 9, 10),
                new Date(2020, 9, 12),
                new Date(2020, 9, 23),
                new Date(2020, 10, 19),
                new Date(2020, 10, 20),
                new Date(2020, 10, 21),
                new Date(2020, 10, 22),
                new Date(2020, 11, 20),
                new Date(2020, 11, 1),
                new Date(2020, 11, 4),
                new Date(2020, 11, 10)
            ],
            startDate: new Date(2020, 8, 9)
        } 
    }
    
    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={2} id="sidebar">
                        <CaretakerSidebar defaultKey={"Home"} />
                    </Col>
                    <Col xs={4} id="availability">
                        <Calendar caretakerAvailability={caretaker.availability} />
                    </Col>
                    <Col xs={4} id="jobs">
                        <Job jobs={caretaker.jobs} />
                    </Col>
                    <Col xs={2} id="avatar">
                        <Avatar user={caretaker} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CareTakerHome;
