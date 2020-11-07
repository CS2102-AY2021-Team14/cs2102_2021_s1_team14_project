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

const CareTakerHome = (props) => {
    const { username } = props;

    const [leaves, setLeaves] = useState([]);

    const getLeaves = async () => {
        axios
            .get(`/api/caretaker/${username}/leaves`)
            .then(response => {
                const { data } = response;
                setLeaves(data.data);
            })
            .catch(error => {
                toast.error(error.response.data.message);
            });
    };

    // TODO use API calls
    const caretaker = {
        name: "Jan Low",
        image: Image,
        job: "Full-time",
        join: "18/09/2020",
        salary: "$2374.23",
        employment: "EMPLOYED"
    }

    // TODO use API calls
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
        getLeaves()
    }, []);

    return (
        <div>
            <Navbar />
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={2} id="sidebar">
                        <CaretakerSidebar defaultKey={"Home"} />
                    </Col>
                    <Col xs={3} id="availability">
                        <Calendar leaves={leaves} />
                    </Col>
                    <Col xs={5} id="jobs">
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
