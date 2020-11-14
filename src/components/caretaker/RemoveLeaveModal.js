import React from "react";
import { Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RemoveLeaveModal = (props) => {
  const {
    isOpen,
    setOpen,
    leaveDate,
    setLeaveDate,
    caretakerLeaves,
    deleteLeave
  } = props;

  return (
    <Modal
      show={isOpen}
      onHide={() => setOpen(false)}
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
          highlightDates={caretakerLeaves}
          filterDate={date => { return caretakerLeaves.filter(d => d.getTime() === date.getTime()).length > 0 }}
          inline
        />
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => deleteLeave(leaveDate)}>
          Delete Leave Date
      </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveLeaveModal;
