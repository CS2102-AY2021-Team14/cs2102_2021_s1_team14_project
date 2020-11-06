import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import CaretakerInfoCard from "../../components/CaretakerInfoCard";

const PcsAdminHome = () => {
  const [upCount, setUpCount] = useState(0);
  const [upCaretaker, setUpCaretaker] = useState([]);

  const getUnderperforming = async () => {
    axios
      .get(`/api/admin/underperforming`)
      .then(response => {
        setUpCount(response.data.count);
        setUpCaretaker(response.data.data);

        response.data.data.forEach(caretaker => {
          axios.get(`/api/caretaker/${caretaker.care_taker}`).then(response => {
            console.log(response);
          });
        });
        console.log(response.data.data);
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  useEffect(() => {
    getUnderperforming();
  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <AdminSidebar defaultKey={"Caretakers"} />
          </Col>
          <Col xs={9} id="page-content">
            <Typography className="mt-3" variant="h3">
              Underperforming Caretakers
            </Typography>
            {upCaretaker.map(caretaker => (
              <CaretakerInfoCard username={caretaker.care_taker} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
