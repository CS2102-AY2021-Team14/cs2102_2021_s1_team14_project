import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import {
  Modal,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
  TextField,
  Toolbar,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import TablePageScroll from "../../components/admin/TablePageScroll";
import { BiSearchAlt, BiEditAlt } from "react-icons/bi";
import Popup from "../../components/admin/Popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "../../components/admin/styles/PcsAdmin.module.css";

const PcsAdminHome = () => {
  const [employeeInfos, setEmployeesInfo] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  // states for table paginations
  const rowsPerPageDropDown = [5, 10, 15];
  const [page, setPage] = useState(0); // page is 0 indexed by documentation
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDropDown[page]);

  // Order states
  const [order, setOrder] = useState(); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState("user_name"); // headerLabels.id
  const [selectedEmp, setSelectedEmp] = useState(null);

  // Setting filter function states
  const [filterFn, setFilterFn] = useState({
    func: items => {
      return items;
    },
  });

  // Pop up states
  const [openPopup, setOpenPopup] = useState(false);
  const [infoToEdit, setInfoToEdit] = useState({
    user_name: "",
    user_address: "",
    user_email: "",
    is_part_time: false,
    name: "",
  });

  // Salary modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [salaryData, setSalaryData] = useState(null);

  // Table header labels mapping with id
  const headerLabels = [
    { label: "Name", id: "username" },
    { label: "Address", id: "user_address" },
    { label: "Email", id: "user_email" },
    { label: "Part-Time/Full-Time", id: "ptft", disableSort: true },
    { label: "", id: " ", disableSort: true },
  ];

  const handleSortRequest = cellId => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(cellId);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getEmployeesInfo = async () => {
    axios.get("/api/admin/employees").then(response => {
      const usersMap = new Map();
      const { data } = response;
      setEmployeesInfo(data.employeesInfo);
      const fetchedData = data.employeesInfo?.map(emp => {
        const {
          user_name,
          is_part_time
        } = emp;

        usersMap.set(user_name, is_part_time);

        return {
          user_name,
          is_part_time,
        };
      });
      setUsersMap(usersMap ?? {});
    });
  };

  const employeesInfoDisplay = () => {
    // Only display selected items
    if (employeeInfos) {
      // eg. page 0 selected, rows per page to show is 5
      // start is 0 * 5 = 0, end is 1 * 5 == 5 (not inclusive)
      if (filterFn) {
        return stableSort(
          filterFn.func(employeeInfos),
          getComparator(order, orderBy)
        ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
      }
    }
  };

  // TODO: figure a better operation
  const handleSearch = e => {
    let value = e.target.value;
    setFilterFn({
      func: items => {
        if (value === "") {
          return items;
        } else {
          return items.filter(item => {
            if (
              item.name.toLowerCase().includes(value) ||
              item.user_email.toLowerCase().includes(value) ||
              item.user_address.toLowerCase().includes(value)
            ) {
              return true;
            }
            return false;
          });
        }
      },
    });
  };

  const handleRowClick = (e) => {
    if (e.target.id !== 'edit-btn' && e.target.id) {
      console.log(e.target.id); // gives me user name
      setSelectedEmp(e.target.id); // username of the employee selected
      setIsModalOpen(true);
      console.log(selectedDate.getMonth());
      console.log(selectedDate.getFullYear());
      console.log(usersMap.get(e.target.id));
    }
  }

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedDate(new Date());
    setSalaryData(null);
  }

  const handleDateChange = (value) => {
    console.log(value);
    setSelectedDate(value);
    console.log(selectedEmp);
    console.log(value.getMonth() + 1);
    console.log(value.getFullYear());
    axios.get(`/api/admin/salary/${selectedEmp}/${value.getMonth() + 1}/${value.getFullYear()}`)
         .then(res => {
           const { data } = res;
           console.log(data.data);
          //  setSalaryData(data.data ?? []);
          
           // Compute salaries
           if (usersMap.get(selectedEmp) === true && data.data.length > 0) {
             // Employee is a part timer
             const computedData = computePartTimeSalary(data.data);
             const care_taker = data.data[0].care_taker;
             const month = value.getMonth() + 1;
             const year = value.getFullYear();
             const pet_days = computedData[1];
             const amount = computedData[0];

             // set some state to insert into salary database later
             setSalaryData({care_taker, month, year, pet_days, amount});
           } else if (usersMap.get(selectedEmp) === false && data.data.length > 0) {
             // employee is full timer
             const computedData = computeFullTimeSalary(data.data)
             const care_taker = data.data[0].care_taker;
             const month = value.getMonth() + 1;
             const year = value.getFullYear();
             const pet_days = computedData[1];
             const amount = computedData[0];

             // set some state to insert into salary database later
             setSalaryData({care_taker, month, year, pet_days, amount});
           } else {
             const care_taker = selectedEmp
             const month = value.getMonth() + 1;
             const year = value.getFullYear();
             const pet_days = 0;
             const amount = usersMap.get(selectedEmp) ? 0 : 3000; // base pay of fulltime = 3000
             setSalaryData({care_taker, month, year, pet_days, amount});
           }
         })
         .catch(err => {
           console.error(err.response.data.message);
         })
  }

  const computePartTimeSalary = (pricesArr) => {
    console.log(pricesArr);
    let salary = 0;
    let petDays = 0;
    for (let i = 0; i < pricesArr.length; i++) {
      salary += pricesArr[i].pet_days * pricesArr[i].price;
      petDays += pricesArr[i].pet_days;
    }
    console.log(salary);
    console.log(petDays);
    return [salary, petDays];
  }

  const computeFullTimeSalary = (pricesArr) => {
    let salary = 3000;
    let petDays = 0;
    let isExcessDays = false;
    for (let i = 0; i < pricesArr.length; i++) {
      petDays += pricesArr[i].pet_days;
      if (petDays > 60 && !isExcessDays) {
        salary += (petDays - 60) * pricesArr[i].price;
        isExcessDays = true;
      } else if (petDays > 60 && isExcessDays) {
        // already hit a limit previously
        salary += pricesArr[i].pet_days * pricesArr[i].price;
      }
    }
    return [salary, petDays];
  }

  const openInPopup = item => {
    console.log(item);
    setInfoToEdit({ ...item });
    setOpenPopup(true);
  };

  useEffect(() => {
    getEmployeesInfo();
  }, [filterFn]);

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
              <Paper className={styles.paper}>
                <Toolbar>
                  <TextField
                    label="Search Employee"
                    variant="outlined"
                    onChange={e => handleSearch(e)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BiSearchAlt />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Toolbar>
                <Table>
                  <TableHead>
                    {headerLabels.map(header => (
                      <TableCell
                        key={header.id}
                        className={styles.label_head}
                        sortDirection={orderBy === header.id ? order : false}
                      >
                        {header.disableSort ? (
                          <Typography className={styles.header}>
                            {header.label}
                          </Typography>
                        ) : (
                          <TableSortLabel
                            active={true}
                            direction={orderBy === header.id ? order : "asc"}
                            onClick={() => {
                              handleSortRequest(header.id);
                            }}
                          >
                            <Typography className={styles.header}>
                              {header.label}
                            </Typography>
                          </TableSortLabel>
                        )}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody className={styles.per_row}>
                    {employeesInfoDisplay().map(item => (
                      <TableRow key={item.user_name} onClick={handleRowClick}>
                        <TableCell id={item.user_name}>{item.name}</TableCell>
                        <TableCell id={item.user_name}>{item.user_address}</TableCell>
                        <TableCell id={item.user_name}>{item.user_email}</TableCell>
                        <TableCell id={item.user_name}>{item.is_part_time.toString()}</TableCell>
                        <TableCell id='edit-btn'>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              openInPopup(item);
                            }} id='edit-btn'
                          >
                            <BiEditAlt id='edit-btn' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
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
              <Popup
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                infoToEdit={infoToEdit}
              ></Popup>
              <Modal open={isModalOpen} onClose={handleClose}>
                <Card className={styles.modalcard}>
                    <CardContent className={styles.yearpicker}>
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        inline
                      />
                    </CardContent>
                    <CardContent>
                      {salaryData && <Table stickyHeader aria-label="employee salary">
                        <TableHead>
                          <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Month</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Pet Days</TableCell>
                            <TableCell>Salary</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>{salaryData.care_taker}</TableCell>
                            <TableCell>{salaryData.month}</TableCell>
                            <TableCell>{salaryData.year}</TableCell>
                            <TableCell>{salaryData.pet_days}</TableCell>
                            <TableCell>{salaryData.amount}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>}
                    </CardContent>
                </Card>
              </Modal>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
