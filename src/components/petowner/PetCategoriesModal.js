import React from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import EditPetCategoryCard from "./EditPetCategoryCard";
import PetCategoryCard from "./PetCategoryCard";

const PetCategoriesModal = (props) => {
  const {
    isEditingCategories,
    handleClose,
    categories,
    addCategory,
    deleteCategory,
    newCategory,
    setNewCategory,
  } = props;

  const onChange = (event) => {
    setNewCategory(event.target.value);
  }

  const addCategoryHandler = () => {
    if (newCategory == '' || /^\s+$/.test(newCategory)) {
      toast.error('Category Cannot be empty!');
      return;
    }

    addCategory();
    handleClose();
  }

  return (
    <Modal show={isEditingCategories} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {categories.map(cat =>
          <PetCategoryCard deleteCategory={deleteCategory} category={cat} />
        )}

        <br />

        <EditPetCategoryCard category={newCategory}
          onChange={onChange} addCategoryHandler={addCategoryHandler}
        />


      </Modal.Body>
    </Modal>
  );
};

export default PetCategoriesModal;