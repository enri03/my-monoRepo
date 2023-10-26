import Monster from '../model/monsterModel.js';
import mongoose  from 'mongoose';
import {getRandomSubSpecies,getRandomSpecies} from '../utils/helperFunctions.js';
// Create a new monster
const createMonster = async (req, res) => {
  try {
    const newMonster = new Monster(req.body);
    await newMonster.save();
    res.status(201).json({message:"Monster Created Succesfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const generateRandomMonster =  async (req, res) => {
    try {
      const { count } = req.body;
      const generatedMonsters = [];
  if (count>0){
      for (let i = 0; i < count; i++) {
        const randomMonster = {
          name: `Monster-${Math.floor(Math.random() * (100 - 1 + 1)) + 1}`,
          level: Math.floor(Math.random() * 10) + 1, // Random level between 1 and 10
          type: {
            species: getRandomSpecies(),
            subSpecies: getRandomSubSpecies(),
          },
        };
  
        const newMonster = new Monster(randomMonster);
        await newMonster.save();
        generatedMonsters.push(newMonster);
      }  
      res.status(201).json({message:`${count} random monsters where created succesfuly`,randomMonsters:generatedMonsters}); }
      else {
        throw new Error("Invalid user input");
      }
    }

     catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  //GET monster list
const getMonstersList = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
  
    try {
      const monsters = await Monster.find()
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
  
      const totalMonsters = await Monster.countDocuments();
  
      res.json({
        monsters,
        totalMonsters,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // DELETE monster by ID
const deleteMonsterByID = async (req, res) => {
    try {
      await Monster.findByIdAndDelete(mongoose.Types.ObjectId(req.params.id));
      const totalMonsters = await Monster.countDocuments();
      res.json({ message: 'Monster deleted',totalMonsters:totalMonsters });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

export { createMonster,generateRandomMonster,getMonstersList,deleteMonsterByID };
