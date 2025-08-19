const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String },
  rating: { type: String },
  img: { type: String },
  base_price: { type: String },
  isSold: { type: Boolean, default: false },
  soldToTeam: { type: String, default: null },
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;