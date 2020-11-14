import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import Avatar from '../../components/avatar/Avatar';
import Navbar from '../../components/Navbar';
import Job from '../../components/job/Job';
import Calendar from '../../components/availability/Calendar';
import Loader from "../../components/Loader";

import YogaPetsLogo from '../../images/logo.png';

// Backed linking
import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";

const CareTakerHome = () => {

    // Caretaker information
    const { username, authToken, roles } = useContext(UserContext); 
    const [caretaker, setCaretaker] = useState({
        user_name: "",
        is_part_time: false,
        introduction: ""
    });

    const [caretakerJobs, setCaretakerJobs] = useState([]);

    const [caretakerLeaves, setCaretakerLeaves] = useState([]);

    const [isLoading, setIsLoading] = useState(true);


    // All the backend URL
    const serverURL = '/api/caretaker/';
    const caretakerURL = serverURL + username;
    const caretakerJobsURL = caretakerURL + "/jobs";
    const caretakerLeaveURL = caretakerURL + "/leaves";

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
            });

        // Get caretaker leave dates
        axios   
            .get(caretakerLeaveURL)
            .then((res) => {
                var caretakerLeaveData = res.data.data;
                setCaretakerLeaves(caretakerLeaveData);
                setIsLoading(false);
            })
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

    // Get leave days format
    const getLeaveDays = () => {
        let leaveDays = [];
        for (var i = 0; i < caretakerLeaves.length; i ++) {
            leaveDays.push(new Date(caretakerLeaves[i].leave_date));
        }
        return leaveDays;
    };

    // Only get active jobs
    const getActiveJobs = () => {
        let activeJobs = [];
        for (var i = 0; i < caretakerJobs.length; i ++) {
            const jobStart = new Date(caretakerJobs[i].start_date);
            const jobEnd = new Date(caretakerJobs[i].end_date);
            const current = new Date();
            if (current.getTime() >= jobStart.getTime() && current.getTime() <= jobEnd.getTime()) {
                activeJobs.push(caretakerJobs[i]);
            }
        }
        return activeJobs;
    }

    const caretakerInfo = {
        username: caretaker.user_name,
        image: YogaPetsLogo,
        job: caretaker.is_part_time ? "Part time" : "Full time",
        join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
        employment: findEmployment(),
        jobs: getActiveJobs(),
        availability: {
            leaveDays: getLeaveDays(),
            startDate: new Date(2020, 8, 3)
        } 
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
                            <CaretakerSidebar defaultKey={"Home"} />
                        </Col>
                        <Col xs={4} id="availability">
                            <Calendar caretakerAvailability={caretakerInfo.availability} />
                        </Col>
                        <Col xs={4} id="jobs">
                            <Job jobs={caretakerInfo.jobs} />
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

export default CareTakerHome;
