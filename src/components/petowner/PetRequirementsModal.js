import React from "react";
import { Button, Card, Form, Modal, Row, Col } from "react-bootstrap";

const PetRequirementsModal = ( props ) => {

    const {
      isOpen, 
      handleClose, 
      requirements, 
      addRequirement, 
      newRequirement, 
      setNewRequirement, 
    } = props;

    const {
        requirement, 
        description
    } = newRequirement

    const onChange = (event) => {
        setNewRequirement({
            ...newRequirement, 
            [event.target.name]: event.target.value,
        })
    }

    const addRequirementHandler = () => {
        addRequirement();
        handleClose();
    }

    return (
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Requirements</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Card>
            <Card.Body>
            <Form className="mt-4 mb-3" onSubmit={() => {}}>

                <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label className="text-right" column sm="4">
                    Requirement:
                </Form.Label>
                <Col sm="8">
                    <Form.Control
                        type="text"
                        value={requirement}
                        name="requirement"
                        onChange={onChange}
                    />
                </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label className="text-right" column sm="4">
                    Requirement:
                </Form.Label>
                <Col sm="8">
                    <Form.Control
                        as="textarea"
                        value={description}
                        name="description"
                        rows={3}
                        onChange={onChange}
                    />
                </Col>
                </Form.Group>

                
            </Form>
            </Card.Body>
        </Card>

        <Button variant="primary" onClick={addRequirementHandler}>
            Add a New Requirement
        </Button>

        </Modal.Body>
      </Modal>
    );
};

export default PetRequirementsModal;