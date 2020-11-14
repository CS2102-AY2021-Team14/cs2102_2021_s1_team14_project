import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { NativeSelect, FormControl } from "@material-ui/core";
import { toast } from "react-toastify";

import SummaryChart from "./charts/SummaryChart";

const PcsAdminPetInfo = () => {
  const [petsInfo, setPetsInfo] = useState([]);
  const [dates, setDates] = useState([]);
  const [displayMonthInfo, setMonthInfo] = useState([]);

  const handleDateChanges = event => {
    const newDisplayInfo = petsInfo.filter(item => {
      return item.month_year === event.target.value;
    });
    setMonthInfo(newDisplayInfo);
  };

  const getPetsInfo = async () => {
    axios
      .get(`/api/admin/petsinfo`)
      .then(response => {
        const {
          data: { data },
        } = response;
        setPetsInfo(data);
        const mappedDates = data
          .map(row => row.month_year)
          .filter((item, index, arr) => {
            return arr.indexOf(item) === index;
          });
        setDates(mappedDates);
      })
      .catch(error => {
        toast.error(error.response.data);
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
            <Container className="mt-3">
              <FormControl>
                <NativeSelect
                  defaultValue=""
                  onChange={e => handleDateChanges(e)}
                >
                  <option value="main">Select Date</option>
                  {dates.map((date, i) => (
                    <option key={i} value={date}>
                      {date}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Container>

            <SummaryChart displayInfo={displayMonthInfo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminPetInfo;
