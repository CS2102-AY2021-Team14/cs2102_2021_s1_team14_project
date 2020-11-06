import React, { useState, useEffect } from "react";
import { Badge, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";

const PcsAdminHome = () => {
  const [upCount, setUpCount] = useState(0);
  const [upCaretakers, setUpCaretakers] = useState([]);

  const getUnderperforming = async () => {
    axios
      .get(`/api/admin/underperforming`)
      .then(response => {
        setUpCount(response.data.count);
        setUpCaretakers(response.data.data);
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

            <Typography>
              You have {upCount} underperforming caretakers
            </Typography>

            {upCaretakers.map(caretaker => (
              <Card key={caretaker.user_name} className="m-2">
                <Card.Body>
                  <Card.Title>
                    {caretaker.user_name}
                    <span className="badgeContainer">
                      <Badge
                        variant={caretaker.is_part_time ? "warning" : "info"}
                      >
                        {caretaker.is_part_time ? "Part-timer" : "Full-timer"}
                      </Badge>
                    </span>
                  </Card.Title>
                  <Card.Text>{caretaker.name ? `${caretaker.name} is underperforming!` : "No name added"}</Card.Text>
                  {console.log(caretaker.error_types, caretaker.error_datas)}
                  {
                    caretaker.error_types.map((error_type, index) => {
                      if (error_type == 1) {
                        return (
                          <Card.Text>
                            Average Rating is: {caretaker.error_datas[index]}
                          </Card.Text>
                        );
                      } else if (error_type == 2) {
                        return (
                          <Card.Text>
                            Average Pet Days Per Motnh is: {caretaker.error_datas[index]}
                          </Card.Text>
                        );
                      } else {
                        return (
                          <Card.Text>
                            Average Rating For This Month is: {caretaker.error_datas[index]}
                          </Card.Text>
                        );
                      }
                    })
                  }
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div >
  );
};

export default PcsAdminHome;
