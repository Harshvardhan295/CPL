const router = require('express').Router();
const Player = require('../models/player.model');
const Team = require('../models/team.model');
// We need the original data for the reset function
const playersData = require('../../src/data/players.json');
const teamsData = require('../../src/data/teams.json');

// GET /api/auction/ - Get all initial data
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    const teams = await Team.find();
    
    const teamsObject = {};
    teams.forEach(team => {
      teamsObject[team.shortName] = team;
    });

    res.json({ players, teams: teamsObject });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching auction data', error });
  }
});

// --- NEW: API ENDPOINT TO SELL A PLAYER ---
// PATCH /api/auction/sell
router.patch('/sell', async (req, res) => {
  try {
    const { playerId, teamShortName, soldPrice } = req.body;

    // Find the player who was sold
    const playerSold = await Player.findById(playerId);
    if (!playerSold) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // 1. Update the player to be 'sold' and record the winning team
    await Player.updateOne(
      { _id: playerId },
      { $set: { isSold: true, soldToTeam: teamShortName } }
    );
    
    // 2. Update the winning team's purse and add the player to their list
    await Team.updateOne(
      { shortName: teamShortName },
      { 
        $inc: { purse: -soldPrice },
        $push: { players: playerSold }
      }
    );

    res.status(200).json({ message: 'Player sold successfully' });

  } catch (error) {
    console.error('Error selling player:', error);
    res.status(500).json({ message: 'Error selling player', error });
  }
});


// --- NEW: API ENDPOINT TO RESET THE AUCTION ---
// POST /api/auction/reset
router.post('/reset', async (req, res) => {
  try {
    // Clear all existing data
    await Player.deleteMany({});
    await Team.deleteMany({});
    
    // Insert the fresh data from the original JSON files
    await Player.insertMany(playersData);
    await Team.insertMany(teamsData);

    res.status(200).json({ message: 'Auction reset successfully' });
  } catch (error) {
    console.error('Error resetting auction:', error);
    res.status(500).json({ message: 'Error resetting auction', error });
  }
});


module.exports = router;