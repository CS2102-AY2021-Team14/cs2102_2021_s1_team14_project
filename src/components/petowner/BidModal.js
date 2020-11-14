import React, { useState, useContext } from "react";
import {
  Button,
  Form,
  Modal,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { RiAuctionFill } from "react-icons/ri";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { UserContext } from "../../utils/UserProvider";
import { toast } from "react-toastify";

// TODO: integrate with backend
const BidModal = props => {
  const {
    isOpen,
    handleClose,
    caretakerUsername,
    caretakerName,
    careTakerPetPrices,
    pets,
  } = props;

  const { username: userUsername } = useContext(UserContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const careablePets = pets.filter(pet =>
    Object.keys(careTakerPetPrices ?? []).includes(pet.type)
  );

  const [pet, setPet] = useState(null);

  const getNumDays = () =>
    moment(endDate)
      .endOf("day")
      .diff(moment(startDate).startOf("day"), "days") + 1;

  const hasPrice = () => {
    const startsLaterThanToday = startDate >= new Date().setHours(0, 0, 0, 0);
    return startsLaterThanToday && getNumDays() >= 1 && pet != null;
  };

  const getPrice = () => {
    const numDays = getNumDays();
    const petType = pets.find(petObj => petObj.name === pet).type;
    const petTypePrice = careTakerPetPrices[petType];

    return numDays * petTypePrice;
  };

  const handleBid = () => {
    if (!hasPrice()) {
      toast.error("Invalid dates or no pets chosen");
      return;
    }

    axios
      .post(`/api/bids/add`, {
        pet,
        owner: userUsername,
        care_taker: caretakerUsername,
        pet_type: pets.find(petObj => petObj.name === pet).type,
        start_date: startDate,
        end_date: endDate,
        price: getPrice(),
      })
      .then(res => {
        toast.success(
          "Successfully bidded, you can check your status in the bids page"
        );
        handleClose();
      })
      .catch(err => {
        console.log("Error posting bid", err);
        toast.error("Error bidding, please try again");
      });
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bid for {caretakerName ?? caretakerUsername}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="mt-4 mb-3" onSubmit={() => {}}>
          <Form.Group as={Row} controlId="startDate">
            <Form.Label className="text-right" column sm="3">
              Start Date:
            </Form.Label>
            <Col sm="9">
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="endDate">
            <Form.Label className="text-right" column sm="3">
              End Date:
            </Form.Label>
            <Col sm="9">
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDropdown">
            <Form.Label className="text-right" column sm="3">
              Care for Pet:
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="select"
                name="type"
                onChange={event => {
                  setPet(
                    event.target.value === "choosePets"
                      ? null
                      : event.target.value
                  );
                }}
              >
                <option value="choosePets">Choose one of your pets:</option>
                {careablePets.map((pet, index) => (
                  <option key={index} value={pet.name}>
                    {pet.name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formDropdown">
            <Form.Label className="text-right" column sm="3">
              Price:
            </Form.Label>
            <Col sm="9">
              {hasPrice() && (
                <Badge variant="info" style={{ fontSize: 20 }}>
                  ${getPrice().toFixed(2)}
                </Badge>
              )}
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleBid}>
          <RiAuctionFill style={{ marginRight: 14 }} />
          Bid!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BidModal;
