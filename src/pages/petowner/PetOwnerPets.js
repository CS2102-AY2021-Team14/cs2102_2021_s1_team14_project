import React, { useState, useEffect } from "react";
import { Button, Container, Modal, Row, Col, Card } from "react-bootstrap";

import { toast } from "react-toastify";
import axios from "axios";

import { mapPetInfoToPetData } from '../../utils/PetsHelper';
import NewPetModal from "../../components/petowner/NewPetModal";
import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import PetCard from "../../components/PetCard";

import { MdPets } from "react-icons/md";

const PetOwnerPets = ( { username } ) => {

  const [pets, setPets] = useState([]);
  const [types, setTypes] = useState([]);
  const [isOpen, setOpen] = useState(false);

  const [newPet, setNewPet] = useState({
    name: '', 
    owner: username, 
    type: 'dog'
  });

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const onChange = event => {
    setNewPet({
      ...newPet,
      [event.target.name]: event.target.value,
    });
  };

  const getPets = async () => {   
    axios
      .get(`/api/pets/${username}`)
      .then(response => {
        const { data } = response;
        const petInfos = data.data.map(petInfo => mapPetInfoToPetData(petInfo));
        setPets(petInfos);
      })
      .catch(error => {
        toast.error(error.response.data.message);
      });
  };

  const addPet = async () => {   
    axios
      .post(`/api/pets/add/`, newPet)
      .then(() => {
        toast.success(`Let's welcome ${newPet.name}!`); 
        handleClose();
      })
      .catch(error => {
        toast.error(`You already have a pet called ${newPet.name}!\nLet's give another name!`); 
      });
  };

  useEffect(() => {
    getPets();
  }, [getPets]);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Pets"} />
          </Col>
          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <MdPets />
                </span>
                My Pets
              </Card.Header>
              <Button onClick={handleOpen} size="lg" > Add a New Pet </Button>
              <NewPetModal petInfo={newPet} addPet={addPet} isOpen={isOpen} handleClose={handleClose} onChange={onChange} />
              <Card.Body>
                {pets.map((data, index) => (
                  <PetCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerPets;
