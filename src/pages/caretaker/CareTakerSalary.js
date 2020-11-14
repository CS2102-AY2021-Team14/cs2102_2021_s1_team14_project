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
import Loader from "../../components/Loader";

const CareTakerSalary = () => {
  
  // Caretaker information
  const { username } = useContext(UserContext); 
  const [allSalaries, setAllSalaries] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const getCareTakerSalary = (username) => {
    axios.get(`/api/caretaker/${username}/salary`)
          .then(res => {
            const { data } = res;
            const fetchedSalaries = data.data ?? [];
            console.log(fetchedSalaries);
            setAllSalaries(fetchedSalaries);
            setIsLoading(false);
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

  const message = (allSalaries.length === 0) 
    ? 'Please work harder ' + username + ", this is unacceptable!"
    : 'Enjoy your money while it lasted ' + username + "!";

  if (isLoading) {
    return <Loader />
  } else {
    return (
      <div>
        <Navbar />
          <Container fluid style={{
            marginTop: '2vh'
          }}>
            <Row className="justify-content-md-center">
              <Col xs={2} id="sidebar">
                <CaretakerSidebar defaultKey={"Salary"} />
              </Col>
              <Col xs={10} id="page-content">
                <Typography variant='h6' style={{
                  marginBottom: '2vh',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  backgroundColor: '#FC5185',
                  padding: '20px',
                  color: 'white',
                  borderRadius: '5px'
                }}>
                  {message}
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
  }
};

export default CareTakerSalary;
