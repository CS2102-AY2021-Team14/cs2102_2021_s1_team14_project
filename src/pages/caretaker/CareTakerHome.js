import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Avatar from '../../components/avatar/Avatar';
import Navbar from '../../components/Navbar';

import Image from '../../images/logo.png';

const CareTakerHome = () => {

    const caretaker = 
        {
            name: "Jan Low",
            image: Image,
            job: "Full-time",
            join: "18/09/2020",
            salary: "$2374.23",
            employment: "EMPLOYED"
        }

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
                    Page Content Goes Into Here. 
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
