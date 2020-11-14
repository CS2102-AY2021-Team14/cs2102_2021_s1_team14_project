import React, { useState, useEffect, useContext } from "react";
import  { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";
// import YogaPetsLogo from '../../images/logo.png';
// import Avatar from '../../components/avatar/Avatar';
import Salary from '../../components/salary/Salary';
import { Typography } from "@material-ui/core";

const CareTakerSalary = () => {
  
  // Caretaker information
  const { username } = useContext(UserContext); 
  const [allSalaries, setAllSalaries] = useState([])

  const getCareTakerSalary = (username) => {
    axios.get(`/api/caretaker/${username}/salary`)
          .then(res => {
            const { data } = res;
            const fetchedSalaries = data.data ?? [];
            console.log(fetchedSalaries);
            setAllSalaries(fetchedSalaries);
          })
          .catch(err => console.error(err.response.data.message));
  }

  useEffect(() => {
    if (username) {
      getCareTakerSalary(username);
    }
  }, [username]);
  // Find employment
  // const findEmployment = () => {
  //     if (caretakerJobs.length < 1) {
  //         return "UNEMPLOYED";
  //     } else {
  //         return "EMPLOYED";
  //     }
  // }

  // const caretakerInfo = {
  //     username: caretaker.user_name,
  //     image: YogaPetsLogo,
  //     job: caretaker.is_part_time ? "Part time" : "Full time",
  //     join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
  //     employment: findEmployment(),
  //     salary: caretakerSalary,
  //     jobs: caretakerJobs,
  // }

  return (
    <div>
      <Navbar />
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={2} id="sidebar">
              <CaretakerSidebar defaultKey={"Salary"} />
            </Col>
            <Col xs={8} id="page-content">
              <Typography variant='h6'>
                You've been working hard {username} !
              </Typography>
              <Typography variant='h6'>
                Here are your monthly salaries:
              </Typography>
              {allSalaries && <Salary allSalaries={allSalaries} />}
            </Col>
            {/* <Col xs={2} id="avatar">
              <Avatar user={caretakerInfo} />
            </Col> */}
          </Row>  
        </Container>
    </div>
  )
};

export default CareTakerSalary;
