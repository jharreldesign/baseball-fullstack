const Ballpark = require("../models/ballpark");

const getAllBallparks = async (req, res) => {
  try {
    const ballparks = await Ballpark.find().populate('teams', 'teamName'); 
    res.json(ballparks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBallparkById = async (req, res) => {
  try {
    const ballpark = await Ballpark.findById(req.params.id).populate('teams', 'teamName'); 
    if (!ballpark) {
      return res.status(404).json({ message: "Ballpark not found" });
    }
    res.json(ballpark);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBallparkByName = async (req, res) => {
  try {
    const { ballparkName } = req.params; 
    const ballpark = await Ballpark.findOne({ ballparkName }).populate('teams', 'teamName'); 
    if (!ballpark) {
      return res.status(404).json({ message: "Ballpark not found" });
    }
    res.json(ballpark);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBallpark = async (req, res) => {
  try {
    const { ballparkName, address, ballparkOpen, capacity, ballparkImg, teams, teamLogo } = req.body;

    if (!ballparkName || !address || !capacity || !teamLogo || !ballparkImg) {
      return res.status(400).json({ message: "Please provide all required fields: ballparkName, address, team logo, ballpark image and capacity." });
    }

    const ballpark = new Ballpark({
      ballparkName,
      address,
      ballparkOpen,
      capacity,
      ballparkImg,
      teamLogo,
      teams 
    });

    await ballpark.save();
    return res.status(201).json(ballpark);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBallpark = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ballpark.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Ballpark deleted");
    }
    return res.status(404).send("Ballpark not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getBallparkByName,
  getAllBallparks,
  getBallparkById,
  createBallpark,
  deleteBallpark
};
