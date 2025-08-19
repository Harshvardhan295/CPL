const mongoose = require('mongoose');
require('dotenv').config();
const Player = require('./models/player.model');
const Team = require('./models/team.model');
const playersData = require('../src/data/players.json');
const teamsData = require('../src/data/teams.json');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connection successful for seeding.");
    await Player.deleteMany({});
    await Team.deleteMany({});
    console.log("Existing data cleared.");
    await Player.insertMany(playersData);
    await Team.insertMany(teamsData);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
};

seedDatabase();