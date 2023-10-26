import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import monsterRoutes from './router/monsterRoutes.js';
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));


// API routes will be defined here
app.use('/api', monsterRoutes);

app.get('/', (req, res) => {
  res.send('API is running....')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
