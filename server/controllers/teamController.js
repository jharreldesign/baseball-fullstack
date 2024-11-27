const { Team, Ballpark } = require("../models");

const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find().populate('ballpark');
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('ballpark');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTeamByName = async (req, res) => {
  try {
    const { teamName } = req.params;
    const team = await Team.findOne({ teamName }).populate('ballpark'); 
    if (!team) {
      return res.status(404).json({ message: "Team not found!" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTeam = async (req, res) => {
  console.log('Received request to create team:', req.body); 
  try {
    const { ballparkId, ...teamData } = req.body;  

    if (ballparkId) {
      const ballpark = await Ballpark.findById(ballparkId);
      if (!ballpark) {
        return res.status(404).json({ message: "Ballpark not found!" });
      }
      teamData.ballpark = ballpark._id; 
    }

    const team = new Team(teamData); 
    await team.save();  
    return res.status(201).json(team);
  } catch (error) {
    console.error('Error creating team:', error); 
    return res.status(500).json({ error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Team.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('Team deleted');
    }
    throw new Error('Team not found, sorry');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getTeamByName,
  getAllTeams,
  getTeamById,
  createTeam,
  deleteTeam
};