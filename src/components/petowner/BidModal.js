import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { RiAuctionFill } from "react-icons/ri";

// TODO: integrate with backend
const BidModal = props => {
  const { isOpen, handleClose, caretakerUsername, caretakerName } = props;

  const pets = []; // todo get from backend

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bid for {caretakerName ?? caretakerUsername}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-4 mb-3" onSubmit={() => {}}>
          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="3">
              Start Date:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                // value={name}
                name="start-date"
                // onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label className="text-right" column sm="3">
              End Date:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                // value={name}
                name="end-date"
                // onChange={onChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDropdown">
            <Form.Label className="text-right" column sm="3">
              Care for Pet:
            </Form.Label>
            <Col sm="9">
              <Form.Control as="select" name="type">
                {pets.map(type => (
                  <option value={type}>{type}</option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success">
          <RiAuctionFill style={{ marginRight: 14 }} />
          Bid!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidModal;
