import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Row, Card } from "react-bootstrap";

export default function HomeScreen() {
  const [monsters, setMonsters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to generate random species
  function getRandomSpecies() {
    const speciesOptions = ["Orc", "Goblin", "Dragon", "Elf", "Dwarf", "Troll"];
    const randomIndex = Math.floor(Math.random() * speciesOptions.length);
    return speciesOptions[randomIndex];
  }

  // Function to generate random sub-species
  function getRandomSubSpecies() {
    const subSpeciesOptions = [
      "Small",
      "Large",
      "Fire",
      "Ice",
      "Poison",
      "Electric",
    ];
    const randomIndex = Math.floor(Math.random() * subSpeciesOptions.length);
    return subSpeciesOptions[randomIndex];
  }
  useEffect(() => {
    const removeOldMonsters = () => {
      const currentTime = Date.now();
      setMonsters((prevMonsters) =>
        prevMonsters.filter(
          (monster) => currentTime - monster.timestamp <= 10000
        )
      );
    };
    const addNewMonster = async () => {
      const newMonster = {
        name: `Monster-${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`,
        type: {
          species: getRandomSpecies(),
          subSpecies: getRandomSubSpecies(),
        },
        timestamp: Date.now(),
      };

      setMonsters((prevMonsters) => [...prevMonsters, newMonster]);
    };

    const interval = setInterval(() => {
      removeOldMonsters(); // Remove monsters displayed for more than 10 seconds
      addNewMonster(); // Add a new monster every second
    }, 1000);

    return () => clearInterval(interval);
  }, [monsters]);

  return (
    <div>
      <Navigation />
      <Row>
        {monsters
          .slice(currentIndex, currentIndex + 10)
          .map((monster, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                <Card.Title>Name: {monster.name}</Card.Title>
                <Card.Text>Species: {monster.type.species}</Card.Text>
                <Card.Text>SubSpecies: {monster.type.subSpecies}</Card.Text>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </div>
  );
}
