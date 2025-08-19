const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true, unique: true },
  logo: { type: String },
  color: { type: String },
  purse: { type: Number },
  players: [Object],
}, { timestamps: true });

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;