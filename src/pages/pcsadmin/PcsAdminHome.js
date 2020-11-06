import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Confetti from "react-confetti";
import useWindowDimensions from "../../utils/WindowDimensions";
const PcsAdminHome = () => {
  const [employeeOfTheMonth, setEmployeeOfTheMonth] = useState({});

  useEffect(() => {
    axios.get("/api/admin/employeeofmonth").then(response => {
      console.log(response.data);
      setEmployeeOfTheMonth(response.data);
    });
  }, []);

  const { height, width } = useWindowDimensions();

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <AdminSidebar defaultKey={"Home"} />
          </Col>
          <Col xs={9} id="page-content">
            <Container className="mt-3">
              <Typography className="m-4" variant="h3">
                Employee of the Month
              </Typography>
              <Typography class="mt-5" variant="h4">
                Congratulations to {employeeOfTheMonth.name}!
              </Typography>
              <Typography class="mt-1" variant="h4">
                [Username : {employeeOfTheMonth.care_taker}]
              </Typography>
              <Image
                src="https://webstockreview.net/images/congratulations-clipart-transparent-background-2.png"
                fluid
              />
            </Container>
            <Confetti
              numberOfPieces={1000}
              width={(width * 3) / 4}
              height={height}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
