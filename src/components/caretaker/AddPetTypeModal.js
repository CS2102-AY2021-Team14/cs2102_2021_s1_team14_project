import React from "react";
import { Row, Col, Modal } from 'react-bootstrap';
import PET_TYPES from "../../utils/PetTypes";
import PetPreferenceCard from "./PetPreferenceCard";

const AddPetTypeModal = (props) => {
  const {
    isOpen,
    setOpen,
    petTypes,
    addPetType
  } = props;

  const rows = () => {
    let rows = [];

    for (let i = 0; i < PET_TYPES.length; i += 2) {
      rows[i / 2] = [];
      rows[i / 2][0] = i;
      rows[i / 2][1] = i + 1;
    }

    return rows;
  }

  console.log(rows());

  return (
    <Modal
      show={isOpen}
      onHide={() => setOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit your Pet Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body class="p-3">
        {
          rows().map(row => (
            <>
              <Row>
                <Col>
                  <PetPreferenceCard addPetType={addPetType} petType={PET_TYPES[row[0]]} petTypes={petTypes} />
                </Col>
                <Col>
                  <PetPreferenceCard addPetType={addPetType} petType={PET_TYPES[row[1]]} petTypes={petTypes} />
                </Col>
              </Row>
              <br />
            </>
          ))
        }

      </Modal.Body>
      <Modal.Footer>

      </Modal.Footer>
    </Modal>
  );
}

export default AddPetTypeModal;
