const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    teamInitials: { type: String, required: true },
    ballpark: { type: String, required: true },
    teamLogo: { type: String, required: true }, 
    ballparkImage: { type: String, required: true }
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
