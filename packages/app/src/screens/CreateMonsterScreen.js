import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Message from "../components/Message";

function CreateMonsterScreen() {
  const [monster, setMonster] = useState({
    name: "",
    level: 1,
    type: {
      species: "",
      subSpecies: "",
    },
  });
  const [createdSuccess, setCreatedSuccess] = useState();
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [randomMonsterCount, setRandomMonsterCount] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleGenerateRandomMonsters = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/generate-random-monster",
        { count: randomMonsterCount },
        config
      );
      setCreatedSuccess(true);
      setMessage(data.message);
      setShow(false);
    } catch (error) {
      setCreatedSuccess(false);
      setMessage("Moster was not created");
      setShow(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedMonster = { ...monster };

    if (name === "type.species" || name === "type.subSpecies") {
      // If the input is for type.species or type.subSpecies, update the nested object.
      const [type, subProperty] = name.split(".");
      updatedMonster[type][subProperty] = value;
    } else {
      // For other inputs (name and level), update the top-level properties.
      updatedMonster[name] = value;
    }

    setMonster(updatedMonster);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/create-monster",
        monster,
        config
      );
      setCreatedSuccess(true);
      setMessage(data.message);
      setMonster({
        name: "",
        level: 1,
        type: {
          species: "",
          subSpecies: "",
        },
      });
    } catch (error) {
      setCreatedSuccess(false);
      setMessage("Moster was not created");
    }
  };

  return (
    <div>
      <Navigation />
      <h1>Create a Monster</h1>
      {createdSuccess === true ? (
        <Message variant="success">{message}</Message>
      ) : (
        createdSuccess === false && (
          <Message variant="danger">{message}</Message>
        )
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="monsterName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={monster.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="monsterLevel">
          <Form.Label>Level:</Form.Label>
          <Form.Control
            type="number"
            name="level"
            value={monster.level}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="monsterSpecies">
          <Form.Label>Species:</Form.Label>
          <Form.Control
            type="text"
            name="type.species"
            value={monster.type.species}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="monsterSubSpecies">
          <Form.Label>Sub-Species:</Form.Label>
          <Form.Control
            type="text"
            name="type.subSpecies"
            value={monster.type.subSpecies}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          Create Monster
        </Button>
        <Button
          variant="primary"
          onClick={handleShow}
          className="mt-2"
          style={{ float: "right" }}
        >
          Generate random monsters
        </Button>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate Random Monsters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="randnomMonster">
            <Form.Control
              type="number"
              placeholder="The number of random monsters"
              value={randomMonsterCount}
              min={1}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue) && parseInt(inputValue) >= 1) {
                  setRandomMonsterCount(parseInt(inputValue));
                }
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleGenerateRandomMonsters}>
            Generate monsters
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateMonsterScreen;
