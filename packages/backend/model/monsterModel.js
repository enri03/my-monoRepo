import mongoose from 'mongoose';

const monsterSchema = new mongoose.Schema({
  name: String,
  level: Number,
  type: {
    species: String,
    subSpecies: String,
  }
}, {
  timestamps: true
});


const Monster = mongoose.model('Monster', monsterSchema);

export default Monster;
