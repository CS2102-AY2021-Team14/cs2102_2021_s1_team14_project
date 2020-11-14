import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import Navbar from '../../components/Navbar';
import CaretakerSidebar from '../../components/sidebar/CaretakerSidebar';
import axios from 'axios';
import { UserContext } from "../../utils/UserProvider";
import YogaPetsLogo from '../../images/logo.png';
import Avatar from '../../components/avatar/Avatar';
import Calendar from "../../components/availability/Calendar";
import { toast } from "react-toastify";
import AddLeaveModal from "../../components/caretaker/AddLeaveModal";
import RemoveLeaveModal from "../../components/caretaker/RemoveLeaveModal";
import PetTypeSelector from "../../components/caretaker/PetTypeSelector";

const CareTakerAvailability = () => {
  // Caretaker information
  const { username } = useContext(UserContext);
  const [caretaker, setCaretaker] = useState({
    user_name: "",
    is_part_time: false,
    introduction: ""
  });

  const [caretakerSalary, setCaretakerSalary] = useState([]);
  const [caretakerJobs, setCaretakerJobs] = useState([]);
  const [caretakerLeaves, setCaretakerLeaves] = useState([]);

  const [isAdderOpen, setAdderOpen] = useState(false);
  const [leaveDate, setLeaveDate] = useState(new Date());

  const [isDeleterOpen, setDeleterOpen] = useState(false);
  const [removedDate, setRemovedDate] = useState(new Date());

  const [petTypes, setPetTypes] = useState([]);

  // All the backend URL
  const serverURL = '/api/caretaker/';
  const caretakerURL = serverURL + username;
  const caretakerSalaryURL = caretakerURL + "/salary";
  const caretakerJobsURL = caretakerURL + "/jobs";
  const caretakerLeaveURL = caretakerURL + "/leaves";
  const caretakerPetTypesURL = caretakerURL + "/pettype";
  const caretakerPetTypesEditURL = caretakerPetTypesURL + "/edit";

  const addLeave = (date) => {
    axios
      .post(caretakerLeaveURL, { leave_date: date })
      .then(() => {
        toast.success(`Added ${date.toISOString().slice(0, 10)} to your leaves!`);
        setAdderOpen(false);
        getLeaves();
      })
      .catch(error => {
        toast.error(`You cannot take leave on  ${date.toISOString().slice(0, 10)}!`);
      });
  }

  const deleteLeave = (date) => {
    axios
      .delete(`${caretakerLeaveURL}/${date.getTime()}`)
      .then(() => {
        toast.success(`Deleted ${date.toISOString().slice(0, 10)} from your leaves!`);
        setDeleterOpen(false);
        getLeaves();
      })
      .catch(error => {
        toast.error(`Error Deleting Leaves leave on  ${date.toISOString().slice(0, 10)}!`);
      });
  }

  const getLeaves = () => {
    axios
      .get(caretakerLeaveURL)
      .then((res) => {
        var caretakerLeaveData = res.data.data;
        let caretakerLeaveDates = caretakerLeaveData.map(item => new Date(item.leave_date));
        setCaretakerLeaves(caretakerLeaveDates);
      });
  }

  const addPetType = (pet_type) => {
    axios
      .post(caretakerPetTypesURL, { pet_type: pet_type, is_part_time: caretaker.is_part_time })
      .then(() => {
        toast.success(`Added ${pet_type} to your preferences`);
        getTypes();
      })
      .catch(error => {
        toast.error(`Error adding ${pet_type}!`);
      });
  }


  const editPetType = (pet_type, price) => {
    axios
      .post(caretakerPetTypesEditURL, { pet_type: pet_type, price: price })
      .then(() => {
        toast.success(`Edited price for ${pet_type}!`);
        getTypes();
      })
      .catch(error => {
        console.log(error);
        toast.error(`Error editing price for ${pet_type}!`);
      });
  }

  const getTypes = () => {
    axios
      .get(caretakerPetTypesURL)
      .then((res) => {
        var petPreferencesData = res.data;
        setPetTypes(petPreferencesData);
      });
  }

  // API call
  useEffect(() => {
    // Getting caretaker data
    axios
      .get(caretakerURL)
      .then((res) => {
        var caretakerData = res.data[0];
        setCaretaker(caretakerData);
      });

    // Getting caretaker salary
    axios
      .get(caretakerSalaryURL)
      .then((res) => {
        var caretakerSalaryData = res.data.data;
        setCaretakerSalary(caretakerSalaryData);
      });

    // Get caretaker job
    axios
      .get(caretakerJobsURL)
      .then((res) => {
        var caretakerJobData = res.data.data;
        setCaretakerJobs(caretakerJobData);
      });

    getLeaves();
    getTypes();
  }, [])

  // Find employment
  const findEmployment = () => {
    if (caretakerJobs.length < 1) {
      return "UNEMPLOYED";
    } else {
      return "EMPLOYED";
    }
  }

  const caretakerInfo = {
    username: caretaker.user_name,
    image: YogaPetsLogo,
    job: caretaker.is_part_time ? "Part time" : "Full time",
    join: (new Date(2020, 8, 9).toDateString().split(" ").splice(1).join(" ")),
    employment: findEmployment(),
    salary: caretakerSalary,
    jobs: caretakerJobs,
  }

  const availability = {
    leaveDays: caretakerLeaves,
    startDate: new Date(2020, 8, 9)
  }

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={2} id="sidebar">
            <CaretakerSidebar defaultKey={"Availability"} />
          </Col>
          <Col xs={4} id="page-content">
            <Row>
              <Calendar caretakerAvailability={availability} />
            </Row>
            <br />
            <Row>
              <Col>
                <Button onClick={() => setAdderOpen(true)}> Add a new Leave Date </Button>
              </Col>
              <Col>
                <Button onClick={() => setDeleterOpen(true)}> Remove a Leave Date </Button>
              </Col>
            </Row>
            <AddLeaveModal
              isAdderOpen={isAdderOpen}
              setAdderOpen={setAdderOpen}
              leaveDate={leaveDate}
              setLeaveDate={setLeaveDate}
              caretakerLeaves={caretakerLeaves}
              addLeave={addLeave}
            />
            <RemoveLeaveModal
              isOpen={isDeleterOpen}
              setOpen={setDeleterOpen}
              leaveDate={removedDate}
              setLeaveDate={setRemovedDate}
              caretakerLeaves={caretakerLeaves}
              deleteLeave={deleteLeave}
            />
          </Col>
          <Col xs={4} id="page-content">
            <PetTypeSelector isPartTime={caretaker.is_part_time} petTypes={petTypes} editPetType={editPetType} addPetType={addPetType} />
          </Col>
          <Col xs={2} id="avatar">
            <Avatar user={caretakerInfo} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CareTakerAvailability;