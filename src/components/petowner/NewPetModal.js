import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Row, Col, Card } from "react-bootstrap";

const NewPetModal = ( props ) => {

    const {
      addPet, 
      isOpen, 
      handleClose, 
      onChange, 
      petInfo
    } = props;

    const {
      name, 
      type
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