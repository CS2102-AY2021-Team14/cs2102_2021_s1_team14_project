import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";

import PetOwnerSidebar from "../../components/sidebar/PetOwnerSidebar";
import Navbar from "../../components/Navbar";
import CaretakerInfoCard from "../../components/CaretakerInfoCard";
import { FaSearch } from "react-icons/fa";

import axios from "axios";

const PetOwnerSearch = () => {
  const [caretakers, setCaretakers] = useState([]);

  const [showFullTimers, setShowFullTimers] = useState(true);
  const [showPartTimers, setShowPartTimers] = useState(true);

  const [showCat, setShowCat] = useState(true);
  const [showDog, setShowDog] = useState(true);
  const [showBird, setShowBird] = useState(true);
  const [showRabbit, setShowRabbit] = useState(true);
  const [showRodent, setShowRodent] = useState(true);
  const [showFish, setShowFish] = useState(true);
  const [showInsect, setShowInsect] = useState(true);
  const [showTurtle, setShowTurtle] = useState(true);

  const [search, setSearch] = useState(null);

  useEffect(() => {
    axios
      .get("/api/caretaker")
      .then(res => {
        let data = res.data.data;

        let caretakers = [];
        // parse data
        for (const rawCaretaker of data) {
          const {
            user_name,
            name,
            is_part_time,
            introduction,
            pet_prices,
            avg_rating,
          } = rawCaretaker;

          const petPrices = {};
          pet_prices.forEach(
            petPrice => (petPrices[petPrice.pet_type] = petPrice.price)
          );

          const caretaker = {
            username: user_name,
            name,
            isPartTime: is_part_time,
            introduction,
            petPrices,
            avgRating: avg_rating,
          };

          caretakers.push(caretaker);
        }

        setCaretakers(caretakers);
      })
      .catch(err => console.log("Error getting caretakers", err));
  }, []);

  const getFilteredCaretakers = () => {
    return caretakers.filter(caretaker => {
      const isSearchShown =
        search == null || search == ""
          ? true
          : caretaker.username.toLowerCase().includes(search) ||
            caretaker.name?.toLowerCase()?.includes(search) ||
            caretaker.introduction?.toLowerCase()?.includes(search);

      const isRoleShown =
        (caretaker.isPartTime && showPartTimers) ||
        (!caretaker.isPartTime && showFullTimers);

      const petTypes = Object.keys(caretaker.petPrices);
      const isPetTypeShown =
        (petTypes.includes("cat") && showCat) ||
        (petTypes.includes("dog") && showDog) ||
        (petTypes.includes("bird") && showBird) ||
        (petTypes.includes("rabbit") && showRabbit) ||
        (petTypes.includes("rodent") && showRodent) ||
        (petTypes.includes("fish") && showFish) ||
        (petTypes.includes("insect") && showInsect) ||
        (petTypes.includes("turtle") && showTurtle);

      return isSearchShown && isRoleShown && isPetTypeShown;
    });
  };

  return (
    <div>
      <Navbar />
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={3} id="sidebar">
            <PetOwnerSidebar defaultKey={"Search"} />
          </Col>

          <Col>
            <Card style={{ margin: 10 }}>
              <Card.Header>
                <span style={{ margin: 10 }}>
                  <FaSearch />
                </span>
                Search for Care Takers
              </Card.Header>

              <Card.Body>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for Care Takers"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                  />
                </InputGroup>

                <div key="inline-checkbox" className="mb-3">
                  <span style={{ marginRight: 10 }}>Care Taker type: </span>
                  <Form.Check
                    inline
                    label="Full-timers"
                    type="checkbox"
                    id="full-timers"
                    checked={showFullTimers}
                    onClick={event => setShowFullTimers(!showFullTimers)}
                  />
                  <Form.Check
                    inline
                    label="Part-timers"
                    type="checkbox"
                    id="part-timers"
                    checked={showPartTimers}
                    onClick={event => setShowPartTimers(!showPartTimers)}
                  />
                </div>

                <div key="inline-checkbox" className="mb-3">
                  <span style={{ marginRight: 10 }}>Pet types: </span>
                  <Form.Check
                    inline
                    label="Cat"
                    type="checkbox"
                    id="cat"
                    checked={showCat}
                    onClick={event => setShowCat(!showCat)}
                  />
                  <Form.Check
                    inline
                    label="Dog"
                    type="checkbox"
                    id="dog"
                    checked={showDog}
                    onClick={event => setShowDog(!showDog)}
                  />
                  <Form.Check
                    inline
                    label="Bird"
                    type="checkbox"
                    id="bird"
                    checked={showBird}
                    onClick={event => setShowBird(!showBird)}
                  />
                  <Form.Check
                    inline
                    label="Rabbit"
                    type="checkbox"
                    id="rabbit"
                    checked={showRabbit}
                    onClick={event => setShowRabbit(!showRabbit)}
                  />
                  <Form.Check
                    inline
                    label="Rodent"
                    type="checkbox"
                    id="rodent"
                    checked={showRodent}
                    onClick={event => setShowRodent(!showRodent)}
                  />
                  <Form.Check
                    inline
                    label="Fish"
                    type="checkbox"
                    id="fish"
                    checked={showFish}
                    onClick={event => setShowFish(!showFish)}
                  />
                  <Form.Check
                    inline
                    label="Insect"
                    type="checkbox"
                    id="insect"
                    checked={showInsect}
                    onClick={event => setShowInsect(!showInsect)}
                  />
                  <Form.Check
                    inline
                    label="Turtle"
                    type="checkbox"
                    id="turtle"
                    checked={showTurtle}
                    onClick={event => setShowTurtle(!showTurtle)}
                  />
                </div>

                {getFilteredCaretakers().map((data, index) => (
                  <CaretakerInfoCard {...data} key={index} />
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PetOwnerSearch;
