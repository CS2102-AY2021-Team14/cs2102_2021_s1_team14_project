import React from "react";
import { Modal } from "react-bootstrap";

import EditPetRequirementCard from "./EditPetRequirementCard";
import PetRequirementCard from "./PetRequirementCard";

const PetRequirementsModal = (props) => {
  const {
    isEditingRequirements,
    handleClose,
    requirements,
    addRequirement,
    deleteRequirement,
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
    <Modal show={isEditingRequirements} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Requirements</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {requirements.map(req =>
          <PetRequirementCard deleteRequirement={deleteRequirement} req={req} />
        )}

        <br />

        <EditPetRequirementCard requirement={requirement}
          description={description} onChange={onChange} addRequirementHandler={addRequirementHandler}
        />

      </Modal.Body>
    </Modal>
  );
};

export default PetRequirementsModal;