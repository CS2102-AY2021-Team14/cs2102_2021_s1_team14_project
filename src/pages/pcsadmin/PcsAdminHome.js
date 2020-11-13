import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import {
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
} from "@material-ui/core";
import axios from "axios";
import TablePageScroll from "../../components/admin/TablePageScroll";
import { BiSearchAlt, BiEditAlt } from "react-icons/bi";
import Popup from "../../components/admin/Popup";

import styles from "../../components/admin/styles/PcsAdmin.module.css";

const PcsAdminHome = () => {
  const [employeeInfos, setEmployeesInfo] = useState([]);

  // states for table paginations
  const rowsPerPageDropDown = [5, 10, 15];
  const [page, setPage] = useState(0); // page is 0 indexed by documentation
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageDropDown[page]);

  // Order states
  const [order, setOrder] = useState(); // 'asc' or 'desc'
  const [orderBy, setOrderBy] = useState("user_name"); // headerLabels.id

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

  // Table header labels mapping with id
  const headerLabels = [
    { label: "Name", id: "username" },
    { label: "Address", id: "user_address" },
    { label: "Email", id: "user_email" },
    { label: "Part-Time/Full-Time", id: "", disableSort: true },
    { label: "Salary", id: "salary", disableSort: true },
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
      const { data } = response;
      setEmployeesInfo(data.employeesInfo);
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

  // Salaries
  const computePartTimeSalary = async () => {
    axios.get()
    return "$$";
  }

  const openInPopup = item => {
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
                      <TableRow key={item.user_name}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.user_address}</TableCell>
                        <TableCell>{item.user_email}</TableCell>
                        <TableCell>{item.is_part_time.toString()}</TableCell>
                    {item.is_part_time ? <TableCell>{computePartTimeSalary()}</TableCell> 
                                            : <TableCell>$$$$</TableCell>}
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              openInPopup(item);
                            }}
                          >
                            <BiEditAlt />
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
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminHome;
