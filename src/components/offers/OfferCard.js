import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import "./Offers.css";
import { toast } from "react-toastify";

const OfferCard = ({
    pet, owner, caretaker, price, pettype, startdate, enddate
}) => {
    const startDate = new Date(startdate);
    const endDate = new Date(enddate);
    const handleAcceptBid = (pet, caretaker, startdate, enddate) => {
        axios
            .post('/api/bids/success/', {
                pet: pet,
                care_taker: caretaker,
                start_date: startdate,
                end_date: enddate,
                payment_type: newOfferInfo.paymentType,
                transfer_method: newOfferInfo.transferMethod
            })
            .then(() => {
                toast.success("You have successfully accepted the bid!");
                handleCloseAccept();
                window.location.reload();
            })
            .catch(() => {
                toast.error("Something went wrong!");
            })
    }

    const handleRejectBid = (pet, caretaker, startdate, enddate) => {
        axios
            .post('/api/bids/inactive/', {
                pet: pet,
                care_taker: caretaker,
                start_date: startdate,
                end_date: enddate
            })
            .then(() => {
                toast.success("You have rejected the bid!");
                handleCloseReject();
                window.location.reload();
            })
            .catch(() => {
                toast.error("Something went wrong!");
            })
    }

    const [newOfferInfo, setNewOfferInfo] = useState({
        paymentType: "",
        transferMethod: ""
    });


    const onChange = event => {
        setNewOfferInfo({
            ...newOfferInfo, 
            [event.target.name]: event.target.value,
        });
    };

    const [showAccept, setShowAccept] = useState(false);
    const handleShowAccept = () => setShowAccept(true);
    const handleCloseAccept = () => setShowAccept(false);

    const [showReject, setShowReject] = useState(false);
    const handleShowReject = () => setShowReject(true);
    const handleCloseReject = () => setShowReject(false);

    return (
        <div className="offercardContainer">
            <div className="offercard">
                <h2>Caring {pet} for {owner}</h2>
                <h3>Pet information</h3>
                <p>Category: {pettype}</p>
                <p>Period: {startDate.toDateString().split(' ').slice(1).join(' ')} to {endDate.toDateString().split(' ').slice(1).join(' ')}</p>
            </div>
            <div className="offerPayment">
                <h1>${price}</h1>
            </div>
            <div className="offerButtons">
                <div style={{
                    marginBottom: '20px'
                }}>
                    <Button variant="primary" onClick={() => handleShowAccept()}>Accept</Button>
                </div>
                <div>
                    <Button variant="danger" onClick={() => handleShowReject()}>Reject</Button>
                </div> 
            </div>
            <Modal show={showAccept} onHide={handleCloseAccept}>
                <Modal.Header closeButton>
                    <Modal.Title>Accept offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextName">
                        <Form.Label className="text-right" column sm="3">
                            Payment Type:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={newOfferInfo.paymentType}
                                name="paymentType"
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextName">
                        <Form.Label className="text-right" column sm="3">
                            Transfer Method:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                value={newOfferInfo.transferMethod}
                                name="transferMethod"
                                onChange={onChange}
                            />
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAccept}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleAcceptBid(pet, caretaker, startdate, enddate)}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showReject} onHide={handleCloseReject}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reject this offer?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReject}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleRejectBid(pet, caretaker, startdate, enddate)}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default OfferCard;
