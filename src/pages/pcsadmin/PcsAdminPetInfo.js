import React,  { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
// import { Bar } from 'react-chartjs-2';
import axios from "axios";
import { NativeSelect, FormControl } from "@material-ui/core";
import { toast } from "react-toastify";

const PcsAdminPetInfo = () => {
  // const [petsInfo, setPetsInfo] = useState([]);
  const [petsInfo, setPetsInfo] = useState([]);

  const getPetsInfo = async () => {
    axios.get(`/api/admin/petsinfo`)
          .then(response => {
            const { data: { data } } = response;
            setPetsInfo(data);
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
  };

  useEffect(() => {
    getPetsInfo();
  }, []);

  return (
    <div>
    <Navbar />
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={3} id="sidebar">
        <AdminSidebar defaultKey={"Pets"} />
        </Col>
        <Col xs={9} id="page-content">

          <FormControl>
              <NativeSelect>
                  <option value="global">
                      Select Date
                  </option>
                  {petsInfo.map((row) => row.month_year)
                           .filter((item, index, array) => { return array.indexOf(item) === index })
                           .map((date, i) => (<option key={i}>{date}</option>)) }
              </NativeSelect>
          </FormControl>

        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default PcsAdminPetInfo;
