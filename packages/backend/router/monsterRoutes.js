import express from 'express';
import { createMonster,generateRandomMonster,getMonstersList,deleteMonsterByID } from '../controller/monsterController.js';

const router = express.Router();

// Create a new monster
router.get('/monsters',getMonstersList)
router.post('/create-monster', createMonster);
router.post('/generate-random-monster',generateRandomMonster);
router.delete('/monsters/:id',deleteMonsterByID)

export default router;
