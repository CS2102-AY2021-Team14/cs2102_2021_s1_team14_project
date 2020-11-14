import React, { useState } from "react";
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import PET_TYPES from "../../utils/PetTypes";
import AddPetTypeModal from './AddPetTypeModal';
import PetPreferenceStatus from "./PetPreferenceStatus";

const PetTypeSelector = (props) => {
  const {
    isPartTime,
    petTypes,
    editPetType,
    addPetType
  } = props;

  const getPetTypes = () => {
    return petTypes;
  }

  const thePetTypes = getPetTypes().map(item => item.pet_type);

  const [isOpen, setOpen] = useState(false);
  const addType = (petType) => {
    addPetType(petType);
    setOpen(false);
  }

  return (
    <div className="calendarContainer">
      <h2>Pet Type Preferences</h2>
      <div className="availabilitystats">
        <div className="calendar">
          {
            petTypes.map(item => (
              <PetPreferenceStatus isPartTime={isPartTime} item={item} editPetType={editPetType} />
            ))
          }
          <br />
          <Button onClick={() => setOpen(true)}>
            Edit Pet Preferences
          </Button>
          <AddPetTypeModal
            isOpen={isOpen}
            setOpen={setOpen}
            petTypes={thePetTypes}
            addPetType={addType}
          />
        </div>
      </div>
    </div>
  );
}

export default PetTypeSelector;