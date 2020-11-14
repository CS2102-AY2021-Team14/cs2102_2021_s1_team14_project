import React, { useState } from "react";
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import EditPriceModal from "./EditPriceModal";

const PetPreferenceStatus = (props) => {
  const {
    isPartTime,
    item,
    editPetType
  } = props;

  const [price, setPrice] = useState(item.price);
  const [isOpen, setOpen] = useState(false);

  return (
    <Card className="m-2 d-flex justify-content-center">
      <Card.Body>
        <h3>{item.pet_type}</h3>
        {
          isPartTime ? (
            <h5> {item.price} </h5>
          ) : (<></>)
        }
        {
          isPartTime ? (
            <>
              <Button onClick={() => setOpen(true)}>
                Edit Price
            </Button>
              <EditPriceModal
                petType={item.pet_type}
                isOpen={isOpen}
                setOpen={setOpen}
                price={price}
                setPrice={setPrice}
                editPetType={editPetType}
              />
            </>
          ) : (<></>)
        }
      </Card.Body>
    </Card>
  );
};

export default PetPreferenceStatus;