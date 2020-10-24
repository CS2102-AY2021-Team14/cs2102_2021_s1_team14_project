import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Avatar from '../../components/avatar/Avatar';
import Navbar from '../../components/Navbar';
import Job from '../../components/job/Job';

import Image from '../../images/logo.png';

const CareTakerHome = () => {

    const caretaker = {
        name: "Jan Low",
        image: Image,
        job: "Full-time",
        join: "18/09/2020",
        salary: "$2374.23",
        employment: "EMPLOYED"
    }

    const jobs = [
        {
            owner: "JanLu",
            pet: "Hippopotamus",
            start: "01/06/1999",
            end: "30/06/2002"
        },
        {
            owner: "SanLo",
            pet: "Hedgehog",
            start: "02/06/1999",
            end: "29/06/2002"
        }
    ]

    useEffect(() => {
        console.log(caretaker);
    })
    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row className="justify-content-md-center">
                <Col xs={2} id="sidebar">
                    <CaretakerSidebar defaultKey={"Home"} />
                </Col>
                <Col xs={8} id="page-content">
                    <Job jobs={jobs} /> 
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
