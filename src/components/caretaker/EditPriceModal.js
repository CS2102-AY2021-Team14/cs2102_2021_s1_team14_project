import React from "react";
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';

const EditPriceModal = (props) => {
  const {
    petType,
    isOpen,
    setOpen,
    price,
    setPrice,
    editPetType
  } = props;


  return (
    <Modal
      show={isOpen}
      onHide={() => setOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Set Your Daily Price for {petType}</Modal.Title>
      </Modal.Header>
      <Modal.Body class="p-3">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Set new pet price</Form.Label>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Enter new price"
              value={price}
              onChange={event => setPrice(event.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => editPetType(petType, price)}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPriceModal;