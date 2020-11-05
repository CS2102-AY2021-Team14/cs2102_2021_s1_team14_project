import React, { useState, useEffect } from "react";
import { Button, Card, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import { MdPerson, MdPets } from "react-icons/md";
import { FaRegStickyNote } from "react-icons/fa";

import { toast } from "react-toastify";
import axios from "axios";

import PetCategoriesModal from './petowner/PetCategoriesModal';
import PetRequirementsModal from './petowner/PetRequirementsModal';

import "./PetCard.css";

const PetCard = props => {
  const {
    deletePet,
    getPets,
    petName,
    petType,
    petOwner,
    petOwnerName,
    petCategories,
    petSpecialRequirements,
  } = props;

  const [newCategory, setNewCategory] = useState('');
  const [isEditingCategories, setEditingCategories] = useState(false);

  const [newRequirement, setNewRequirement] = useState({
    requirement: '',
    description: ''
  });
  const [isEditingRequirements, setEditingRequirements] = useState(false);

  const deletePetAndClosePopover = () => {
    deletePet(petName);
    document.body.click();
  };

  const addRequirement = async () => {
    axios
      .post(`/api/pets/${petOwner}/${petName}/requirement`, newRequirement)
      .then(() => {
        toast.success(`Added New Requirement for ${petName}!`);
        setEditingRequirements(false);
        getPets();
      })
      .catch(error => {
        toast.error(`Requirement of ${newRequirement.requirement} already exists!`);
      });
  };

  const deleteRequirement = async (requirement) => {
    axios
      .delete(`/api/pets/${petOwner}/${petName}/${requirement}`)
      .then(() => {
        toast.success(`Delete Requirement of ${requirement} for ${petName}!`);
        setEditingRequirements(false);
        getPets();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addCategory = async () => {
    axios
      .post(`/api/pets/${petOwner}/${petName}/category`, newCategory)
      .then(() => {
        toast.success(`Added New Category for ${petName}!`);
        setEditingCategories(false);
        getPets();
      })
      .catch(error => {
        toast.error(`Requirement of ${newCategory} already exists!`);
      });
  };

  const deleteCategory = async (category) => {
    axios
      .delete(`/api/pets/${petOwner}/${petName}/category`, category)
      .then(() => {
        toast.success(`Delete Requirement of ${category} for ${petName}!`);
        setEditingCategories(false);
        getPets();
      })
      .catch(error => {
        console.error(error);
      });
  };


  const deleteWarning = (
    <Popover id="popover-basic">
      <Popover.Title>
        <h3> Warning! </h3>
      </Popover.Title>
      <Popover.Content>
        <p>
          Are you sure you want to delete this pet?
        This action is <strong>irreversible</strong>!
         </p>

        <Button className="button" variant="danger" onClick={deletePetAndClosePopover}>
          Remove
        </Button>
        <Button className="button" variant="secondary" onClick={() => document.body.click()}>
          Cancel
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <Card className="petCardContainer">
      <Card.Body className="petCardBodyContainer">
        <Card.Title>{petName}</Card.Title>
        <div>
          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet Type: {petType}
          </div>

          <div>
            <span className="iconContainer">
              <MdPets />
            </span>
            Pet Categories:
            <span className="badgeContainer">
              {petCategories?.map((category, index) => (
                <Badge key={index} variant="light" style={{ margin: 4 }}>
                  {category}
                </Badge>
              ))}
            </span>
          </div>

          <div>
            <span className="iconContainer">
              <MdPerson />
            </span>
            Pet Owner: {petOwnerName ?? petOwner}
          </div>

          <div>
            <span className="iconContainer">
              <FaRegStickyNote />
            </span>
            Special Requirements:
            <span className="badgeContainer">
              {petSpecialRequirements?.map((requirement, index) => (
                <Badge key={index} variant="light" style={{ margin: 4 }}>
                  {requirement.requirement}
                </Badge>
              ))}
            </span>
          </div>
        </div>

        <Button className="button" variant="primary" onClick={() => setEditingRequirements(true)}>
          Edit Requirements
        </Button>
        <PetRequirementsModal
          isEditingRequirements={isEditingRequirements}
          addRequirement={addRequirement} deleteRequirement={deleteRequirement}
          newRequirement={newRequirement} setNewRequirement={setNewRequirement}
          requirements={petSpecialRequirements} handleClose={() => setEditingRequirements(false)} />

        <Button className="button" variant="primary" onClick={() => setEditingCategories(true)}>
          Edit Categories
        </Button>
        <PetCategoriesModal
          isEditingCategories={isEditingCategories}
          addCategory={addCategory} deleteCategory={deleteCategory}
          newCategory={newCategory} setNewCategory={setNewCategory}
          categories={petCategories} handleClose={() => setEditingCategories(false)}
        />
        <OverlayTrigger trigger="click" placement="top" overlay={deleteWarning} rootClose >
          <Button className="button" variant="danger" >
            Remove
        </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
