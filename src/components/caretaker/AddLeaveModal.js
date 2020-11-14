import React from "react";
import { Button, Col, Row, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddLeaveModal = (props) => {
  const {
    isAdderOpen,
    setAdderOpen,
    leaveDate,
    setLeaveDate,
    caretakerLeaves,
    addLeave
  } = props;

  return (
    <Modal
      show={isAdderOpen}
      onHide={() => setAdderOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a new Leave Date</Modal.Title>
      </Modal.Header>
      <Modal.Body class="p-3 d-flex justify-content-center">
        <DatePicker
          minDate={new Date(2020, 8, 9)}
          selected={leaveDate}
          onChange={date => setLeaveDate(date)}
          filterDate={date => { return caretakerLeaves.filter(d => d.getTime() === date.getTime()).length === 0 }}
          inline
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => addLeave(leaveDate)}>
          Add New Leave Date
               </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddLeaveModal;
