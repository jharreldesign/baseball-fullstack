const mongoose = require('mongoose');
const { Schema } = mongoose;

const ballparkSchema = new Schema({
    ballparkName: { type: String, required: true },
    address: [
        {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: Number, required: true }
        },
    ],
    ballparkOpen: { type: String, required: true },
    capacity: { type: Number, required: true },
    ballparkImg: { type: String, required: true },
    teamLogo: { type: String, required: true },
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: [] }]
});

const Ballpark = mongoose.model('Ballpark', ballparkSchema);

module.exports = Ballpark;
