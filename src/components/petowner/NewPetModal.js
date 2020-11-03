import React from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

const NewPetModal = ( props ) => {

    const {
      addPet, 
      isOpen, 
      handleClose, 
      onChange, 
      petInfo, 
      petTypes
    } = props;

    const {
      name
    } = petInfo;

    return (
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form className="mt-4 mb-3" onSubmit={() => {}}>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="3">
              Pet Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                value={name}
                name="name"
                onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDropdown">
            <Form.Label className="text-right" column sm="3">
              Pet Type:
            </Form.Label>
            <Col sm="9">
              <Form.Control as="select" name="type" onChange={e => onChange(e)}>
                {petTypes.map(type => 
                  <option value={type}>{type}</option>
                )}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addPet}>
            Add a New Pet!
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default NewPetModal;