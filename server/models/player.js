const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    currentTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    playerNumber: { type: Number, required: true },
    position: { type: String, required: true },
    throws: { type: Boolean, required: true }, 
    hits: { type: Boolean, required: true },   
    hometown: { type: String, required: true },
    state: { type: String, required: true },
    headshot: { type: String, required: true },
    actionPhoto: { type: String, required: true },
    debut: { type: Number, required: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
