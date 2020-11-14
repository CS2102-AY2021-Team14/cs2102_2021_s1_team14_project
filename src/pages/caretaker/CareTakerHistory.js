import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Navbar from '../../components/Navbar';
import Avatar from '../../components/avatar/Avatar';
import History from '../../components/history/History';
import Loader from "../../components/Loader";

import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";

import YogaPetsLogo from '../../images/logo.png';

const CareTakerHistory = () => {
    // Caretaker information
    const { username, authToken, roles } = useContext(UserContext); 
    const [caretaker, setCaretaker] = useState({
        user_name: "",
        is_part_time: false,
        introduction: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    const [caretakerJobs, setCaretakerJobs] = useState([]);

    // All the backend URL
    const serverURL = '/api/caretaker/';
    const caretakerURL = serverURL + username;
    const caretakerJobsURL = caretakerURL + "/jobs";

    // API call
    useEffect(() => {
        // Getting caretaker data
        axios
            .get(caretakerURL)
            .then((res) => {
                var caretakerData = res.data[0];
                setCaretaker(caretakerData);
            });

        // Get caretaker job
        axios
            .get(caretakerJobsURL)
            .then((res) => {
                var caretakerJobData = res.data.data;
                setCaretakerJobs(caretakerJobData);
                setIsLoading(false);
            });
    }, [])

    // Find employment
    const findEmployment = () => {
        let currentJobs = [];
        const today = new Date();
        for (var i = 0; i < caretakerJobs.length; i ++) {
            const jobStart = new Date(caretakerJobs[i].start_date)
            const jobEnd = new Date(caretakerJobs[i].end_date);
            if (today.getTime() >= jobStart.getTime() && today.getTime() <= jobEnd.getTime()) {
                currentJobs.push(caretakerJobs[i]);
            }
        }
        if (currentJobs.length < 1) {
            return "UNEMPLOYED";
        } else {
            return "EMPLOYED";
        }
    }

    // Find past jobs
    const findPastJobs = () => {
        let pastJobs = [];
        for (var i = 0; i < caretakerJobs.length; i ++) {
            const jobEnd = new Date(caretakerJobs[i].end_date);
            const today = new Date();
            if (today.getTime() > jobEnd.getTime()) {
                pastJobs.push(caretakerJobs[i]);
            }
        }
        return pastJobs;
    }

    const caretakerInfo = {
        username: caretaker.user_name,
        image: YogaPetsLogo,
        job: caretaker.is_part_time ? "Part time" : "Full time",
        join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
        employment: findEmployment(),
        pastJobs: findPastJobs()
    }

    if (isLoading) {
        return <Loader />
    } else {
        return (
            <div>
                <Navbar />
                <Container fluid>
                    <Row className="justify-content-md-center">
                    <Col xs={2} id="sidebar">
                        <CaretakerSidebar defaultKey={"History"} />
                    </Col>
                    <Col xs={8} id="page-content">
                        <History histories={caretakerInfo.pastJobs} />
                    </Col>
                    <Col xs={2} id="avatar">
                        <Avatar user={caretakerInfo} />
                    </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default CareTakerHistory;