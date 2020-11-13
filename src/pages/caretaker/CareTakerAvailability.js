import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";
import YogaPetsLogo from '../../images/logo.png';
import Avatar from '../../components/avatar/Avatar';
import Calendar from "../../components/availability/Calendar";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CareTakerAvailability = () => {
  // Caretaker information
  const { username, authToken, roles } = useContext(UserContext);
  const [caretaker, setCaretaker] = useState({
    user_name: "",
    is_part_time: false,
    introduction: ""
  });

  const [caretakerSalary, setCaretakerSalary] = useState([]);
  const [caretakerJobs, setCaretakerJobs] = useState([]);
  const [caretakerLeaves, setCaretakerLeaves] = useState([]);

  const [isOpen, setOpen] = useState(false);

  // All the backend URL
  const serverURL = '/api/caretaker/';
  const caretakerURL = serverURL + username;
  const caretakerSalaryURL = caretakerURL + "/salary";
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
        console.log("Content of this caretaker is: " + JSON.stringify(caretakerData));
      });

    // Getting caretaker salary
    axios
      .get(caretakerSalaryURL)
      .then((res) => {
        var caretakerSalaryData = res.data.data;
        setCaretakerSalary(caretakerSalaryData);
        console.log("This caretaker salary data is: " + JSON.stringify(caretakerSalaryData));
      });

    // Get caretaker job
    axios
      .get(caretakerJobsURL)
      .then((res) => {
        var caretakerJobData = res.data.data;
        setCaretakerJobs(caretakerJobData);
        console.log("This caretaker job information is: " + JSON.stringify(caretakerJobData))
      });

    axios
      .get(caretakerLeaveURL)
      .then((res) => {
        var caretakerLeaveData = res.data.data;
        setCaretakerLeaves(caretakerLeaveData);
        console.log("This caretaker leave date is: " + JSON.stringify(caretakerLeaveData));
      });
  }, [])

  // Find employment
  const findEmployment = () => {
    if (caretakerJobs.length < 1) {
      return "UNEMPLOYED";
    } else {
      return "EMPLOYED";
    }
  }

  const caretakerInfo = {
    username: caretaker.user_name,
    image: YogaPetsLogo,
    job: caretaker.is_part_time ? "Part time" : "Full time",
    join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
    employment: findEmployment(),
    salary: caretakerSalary,
    jobs: caretakerJobs,
  }

  const availability = {
    leaveDays: caretakerLeaves,
    startDate: new Date(2020, 8, 9)
  }

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={2} id="sidebar">
            <CaretakerSidebar defaultKey={"Availability"} />
          </Col>
          <Col xs={8} id="page-content">
            <Calendar caretakerAvailability={availability} />
            <br />
            <Button onClick={() => setOpen(true)}> Add a new Leave Date </Button>
            <>
              <Modal
                show={isOpen}
                onHide={() => setOpen(false)}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add a new Leave Date</Modal.Title>
                </Modal.Header>
                <Modal.Body class="p-5 d-flex justify-content-center">
                  <DatePicker
                    selected={new Date()}
                    onChange={() => { }}
                  />
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
              </Modal>
            </>
          </Col>
          <Col xs={2} id="avatar">
            <Avatar user={caretakerInfo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CareTakerAvailability;