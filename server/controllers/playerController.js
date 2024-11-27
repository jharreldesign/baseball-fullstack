const { Player } = require('../models');

const getAllPlayers = async (req, res) => {
  try {
    let players = await Player.find({}).populate("currentTeam");
    res.json(players);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const getPlayerById = async (req, res) => {
  try {
    let { id } = req.params;
    let player = await Player.findById(id).populate("currentTeam");
    if (player) {
      return res.json({
        firstName: player.firstName,
        lastName: player.lastName,
        playerNumber: player.playerNumber,
        position: player.position,
        throws: player.throws,
        hits: player.hits,
        hometown: player.hometown,
        state: player.state,
        headshot: player.headshot,
        debut: player.debut,
        actionPhoto: player.actionPhoto,
        currentTeam: {
          _id: player.currentTeam._id, 
          teamName: player.currentTeam.teamName,
          city: player.currentTeam.city,
          state: player.currentTeam.state,
          teamInitials: player.currentTeam.teamInitials
        }
      });
    }
    return res.status(400).send('Player with the specified ID does not exist');
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).send('That player does not exist!');
    }
    return res.status(500).send(error.message);
  }
}

const createPlayer = async (req, res) => {
  console.log('Received request to create player:', req.body); 
  try {
    const player = new Player(req.body);
    await player.save();
    return res.status(201).json(player);
  } catch (error) {
    console.error('Error creating player:', error); 
    return res.status(500).json({ error: error.message });
  }
}

const updatePlayer = async (req, res) => {
  try {
    let { id } = req.params;
    let updated = await Player.findByIdAndUpdate(id, req.body, { new: true }).populate("currentTeam");
    if (updated) {
      return res.status(200).json(updated);
    }
    throw new Error('Player not Found, sorry.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const deletePlayer = async (req, res) => {
  try {
    let { id } = req.params;
    let deleted = await Player.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('Player deleted');
    }
    throw new Error('Player not Found, sorry');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
}
