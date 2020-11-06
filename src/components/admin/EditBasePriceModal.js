import React, { useState } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export const EditBasePriceModal = props => {
  const { isOpen, handleClose, petType, basePrice, setPrice } = props;

  const [newBasePrice, setNewBasePrice] = useState(basePrice);

  const editBasePrice = () => {
    const newPrice = Number.parseFloat(newBasePrice);

    if (Number.isNaN(newPrice)) {
      toast.error("Please enter a valid price!");
      return;
    }

    const body = { base_price: newPrice, pet_type: petType };

    axios
      .put("/api/admin/basedailyprices", body)
      .then(response => {
        toast.success(response.data.message);
        console.log(response);
      })
      .catch(error => {
        toast.error(error.response.data);
      });

    setPrice(petType, newBasePrice);
    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Pet Price for {petType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Set new pet price</Form.Label>

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="text"
              placeholder="Enter new price"
              value={newBasePrice}
              onChange={event => setNewBasePrice(event.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={editBasePrice}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
