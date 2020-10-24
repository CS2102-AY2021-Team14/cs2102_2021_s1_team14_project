import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Navbar from '../../components/Navbar';

const CareTakerHistory = () => {
    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row className="justify-content-md-center">
                <Col xs={2} id="sidebar">
                    <CaretakerSidebar defaultKey={"History"} />
                </Col>
                <Col xs={8} id="page-content">
                    History 
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CareTakerHistory;