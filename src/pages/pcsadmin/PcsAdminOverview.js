import React,  { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";

const PcsAdminOverview = () => {
  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
          <AdminSidebar defaultKey={"Overview"} />
          </Col>
          <Col xs={9} id="page-content">
            Page Content Goes Into Here.
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminOverview;
