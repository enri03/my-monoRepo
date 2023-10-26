import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
} from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Navigation from "../components/Navigation";

const MonstersListScreen = () => {
  const [monsters, setMonsters] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalMonsters, setTotalMonsters] = useState(0);
  const [deleteSuccess, setDeletetSuccess] = useState();
  const [message, setMessage] = useState("");
  const [fetchMonsterError, setFetchMonsterError] = useState(false);

  // Function to delete a monster by ID
  const deleteMonster = async (monsterId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/monsters/${monsterId}`
      );
      setDeletetSuccess(true);
      setMessage(data.message);
      // Remove the deleted monster from the monsters state
      setTotalMonsters(data.totalMonsters);
      setMonsters((prevMonsters) =>
        prevMonsters.filter((monster) => monster._id !== monsterId)
      );
    } catch (error) {
      setDeletetSuccess(false);
      setMessage(
        "Something went wrong deleting this monmster , try again later"
      );
    }
  };

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Function to handle limit change
  const handleLimitChange = (event) => {
    if (event.target.value !== "") {
      setLimit(event.target.value);
      setPage(1);
    }
  };

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/monsters?page=${page}&limit=${limit}`
        );
        setMonsters(data.monsters);
        setTotalMonsters(data.totalMonsters);
      } catch (error) {
        setFetchMonsterError(true);
        setMessage(
          "Something went wrong fetching the data, please referesh the page "
        );
      }
    };
    fetchMonsters();
  }, [page, limit, deleteSuccess]);

  return (
    <Container>
      <Navigation />
      <h1>Monsters List</h1>
      {deleteSuccess === true ? (
        <Message variant="warning">{message} </Message>
      ) : (
        deleteSuccess === false && <Message variant="danger">{message}</Message>
      )}
      <Row>
        {fetchMonsterError && <Message variant="danger">{message}</Message>}
        {totalMonsters > 0 ? (
          monsters.map((monster) => (
            <Col key={monster._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Name: {monster.name}</Card.Title>
                  <Card.Text>
                    Species:{" "}
                    {monster.type.species
                      ? monster.type.species
                      : "Not specified"}
                  </Card.Text>
                  <Card.Text>
                    SubSpecies:{" "}
                    {monster.type.subSpecies
                      ? monster.type.subSpecies
                      : "Not specified"}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => deleteMonster(monster._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center">There are no monsters created yet</div>
        )}
      </Row>
      {totalMonsters > 0 && (
        <Pagination>
          {Array.from({ length: Math.ceil(totalMonsters / limit) }).map(
            (_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      )}
      {totalMonsters > 0 && (
        <Form.Group>
          <Form.Label>Show Monsters per Page:</Form.Label>
          <Form.Control
            type="number"
            value={limit}
            onChange={handleLimitChange}
            style={{ width: "80px" }}
            min={1}
          />
        </Form.Group>
      )}
    </Container>
  );
};

export default MonstersListScreen;
