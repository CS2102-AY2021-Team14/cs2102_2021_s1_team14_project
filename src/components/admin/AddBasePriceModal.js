import React, { useState } from "react";
import { Button, Form, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import PET_TYPES from "../../utils/PetTypes";

export const AddBasePriceModal = props => {
  const { isOpen, handleClose, addPrice } = props;

  const [newPetType, setNewPetType] = useState("");
  const [newBasePrice, setNewBasePrice] = useState(0);

  const addBasePrice = () => {
    const price = Number.parseFloat(newBasePrice);

    if (!newPetType || price <= 0 || newPetType === "Choose...") {
      toast.error("Please enter a valid pet type and price!");
      return;
    }

    const body = {
      base_price: price,
      pet_type: newPetType.toLowerCase(),
    };

    axios
      .post("/api/admin/basedailyprices", body)
      .then(response => {
        console.log(response);
        toast.success(response.data.message);
        addPrice(newPetType, price);
      })
      .catch(error => {
        toast.error(
          "Error adding new daily price. Check if it is already added!"
        );
        return;
      });

    handleClose();
  };

  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Pet Price for</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Group controlId="formGridState">
            <Form.Label>Select pet type:</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={event => setNewPetType(event.target.value)}
            >
              <option>Choose...</option>
              {PET_TYPES.map(petType => (
                <option key={petType}>{petType}</option>
              ))}
            </Form.Control>
          </Form.Group>

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
        <Button variant="primary" onClick={addBasePrice}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
