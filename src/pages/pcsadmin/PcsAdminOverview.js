import React, { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/sidebar/AdminSidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { Typography } from "@material-ui/core";
import { AddBasePriceModal } from "../../components/admin/AddBasePriceModal";
import { EditBasePriceModal } from "../../components/admin/EditBasePriceModal";

const PcsAdminOverview = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [baseDailyPrices, setBaseDailyPrices] = useState([]);

  const [selectedPetType, setSelectedPetType] = useState();
  const [selectedBasePrice, setSelectedBasePrice] = useState();

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const handleShowEditModal = (pet_type, base_price) => {
    setSelectedPetType(pet_type);
    setSelectedBasePrice(base_price);
    setShowEditModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };
  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const setPrice = (pet_type, base_price) => {
    const updatedPrices = baseDailyPrices.map(dailyPrice =>
      dailyPrice.pet_type === pet_type
        ? { ...dailyPrice, pet_type, base_price }
        : { ...dailyPrice }
    );
    setBaseDailyPrices(updatedPrices);
  };

  const addPrice = (pet_type, base_price) => {
    const updatedPrices = [...baseDailyPrices, { pet_type, base_price }];
    setBaseDailyPrices(updatedPrices);
  };

  const handleDelete = pet_type => {
    const pet = pet_type.toLowerCase();

    axios
      .delete(`/api/admin/basedailyprices/${pet}`)
      .then(response => {
        toast.success(response.data.message);
        removePrice(pet_type);
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  const removePrice = pet_type => {
    const updatedPrices = baseDailyPrices.filter(
      dailyPrice => dailyPrice.pet_type !== pet_type
    );
    setBaseDailyPrices(updatedPrices);
  };

  const getBaseDailyPrices = async () => {
    axios
      .get("/api/admin/basedailyprices")
      .then(response => {
        setBaseDailyPrices(response.data.data);
      })
      .catch(error => {
        toast.error(error.response.data);
      });
  };

  useEffect(() => {
    getBaseDailyPrices();
  }, []);

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <AdminSidebar defaultKey={"Overview"} />
          </Col>
          <Col xs={9} id="page-content">
            <Typography className="mt-3 mb-3" variant="h3">
              Base Daily Prices
            </Typography>

            <Button variant="info" onClick={handleShowAddModal}>
              Add new base daily price
            </Button>
            <AddBasePriceModal
              isOpen={showAddModal}
              handleClose={handleCloseAddModal}
              addPrice={addPrice}
            />

            {baseDailyPrices.map(basePrice => (
              <Card className="bidCardContainer" key={basePrice.pet_type}>
                <Card.Body className="bidCardBodyContainer">
                  <Card.Title>{basePrice.pet_type}</Card.Title>
                  <Card.Text>${basePrice.base_price}</Card.Text>
                  <Button
                    className="button"
                    variant="danger"
                    onClick={() => handleDelete(basePrice.pet_type)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="button"
                    variant="warning"
                    onClick={() =>
                      handleShowEditModal(
                        basePrice.pet_type,
                        basePrice.base_price
                      )
                    }
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            ))}

            <EditBasePriceModal
              isOpen={showEditModal}
              handleClose={handleCloseEditModal}
              petType={selectedPetType}
              basePrice={selectedBasePrice}
              setPrice={setPrice}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PcsAdminOverview;
