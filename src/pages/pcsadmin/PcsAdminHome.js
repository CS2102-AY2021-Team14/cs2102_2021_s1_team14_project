import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Confetti from "react-confetti";

const PcsAdminHome = () => {
  const [employeeOfTheMonth, setEmployeeOfTheMonth] = useState("");

  useEffect(() => {
    axios.get("/api/admin/employeeofmonth").then(response => {
      setEmployeeOfTheMonth(response.data.care_taker);
    });
  }, []);

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
                {employeeOfTheMonth}
              </Typography>

              <Image
                src="https://webstockreview.net/images/congratulations-clipart-transparent-background-2.png"
                fluid
              />
              <Confetti />
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
