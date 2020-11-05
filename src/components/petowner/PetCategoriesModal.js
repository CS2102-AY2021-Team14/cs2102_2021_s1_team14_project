import React from "react";
import { Modal } from "react-bootstrap";

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
    addCategory();
    handleClose();
  }

  return (
    <Modal show={isEditingCategories} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  );
};

export default PetCategoriesModal;