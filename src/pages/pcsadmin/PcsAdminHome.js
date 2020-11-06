import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import { Paper, Typography, Table, TableBody, TableRow, TableCell, TableHead, TablePagination } from "@material-ui/core";
import axios from "axios";
import TablePageScroll from "../../components/admin/TablePageScroll";
// import Confetti from "react-confetti";

import styles from "../../components/admin/styles/PcsAdmin.module.css";

const PcsAdminHome = () => {
  // const [employeeOfTheMonth, setEmployeeOfTheMonth] = useState("");
  const [employeeInfos, setEmployeesInfo] = useState([]);
      
  // states for table paginations
  const rowsPerPageDropDown = [5, 10, 15];
  const [page, setPage] = useState(0); // page is 0 indexed by documentation
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDropDown[page])

  // useEffect(() => {
  //   axios.get("/api/admin/employeeofmonth").then(response => {
  //     setEmployeeOfTheMonth(response.data.care_taker);
  //   });
  // }, []);

  const employeesInfoDisplay = () => {
    // Only display selected items 
    if (employeeInfos) {
      // eg. page 0 selected, rows per page to show is 5
      // start is 0 * 5 = 0, end is 1 * 5 == 5 (not inclusive)
      return employeeInfos.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    }
  }

  const headerLabels = [
    'Name',
    'Address',
    'Email',
    'Part-Time/Full-Time'
  ]

  const getEmployeesInfo = async () => {
    axios.get("/api/admin/employees")
         .then(response => {
           const { data } = response;
           setEmployeesInfo(data.employeesInfo);
         });
  }

  useEffect(() => {
    getEmployeesInfo();
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
              {/* <Typography className="m-4" variant="h3">
                Employee of the Month
              </Typography>
              <Typography class="mt-5" variant="h4">
                {employeeOfTheMonth}
              </Typography>

              <Image
                src="https://webstockreview.net/images/congratulations-clipart-transparent-background-2.png"
                fluid
              />
              <Confetti /> */}
              <Paper className={styles.paper}>
                <Table>
                  <TableHead>
                  {
                      headerLabels.map(label => (
                        <TableCell key={label} className={styles.label_head}>
                          <Typography className={styles.header}>
                                {label}
                          </Typography>
                        </TableCell>
                      ))
                  }
                  </TableHead>
                  <TableBody className={styles.per_row} >
                    {
                      employeesInfoDisplay().map(item => 
                        (<TableRow key={item.user_name}>
                            <TableCell>{item.user_name}</TableCell>
                            <TableCell>{item.user_address}</TableCell>
                            <TableCell>{item.user_email}</TableCell>
                            <TableCell>{item.is_part_time.toString()}</TableCell>
                        </TableRow>)
                      )
                    }
                  </TableBody>
                </Table>
                <TablePageScroll 
                  employeeInfos={employeeInfos} 
                  rowsPerPage={rowsPerPage}
                  page={page}
                  rowsPerPageDropDown={rowsPerPageDropDown}
                  setPage={setPage}
                  setRowsPerPage={setRowsPerPage}
                />
              </Paper>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
