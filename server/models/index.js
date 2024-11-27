const mongoose = require('mongoose');
const Team = require("./team");
const Player = require("./player");
const Ballpark = require("./ballpark");
const Schedule = require("./schedule");

module.exports = {
    Team,
    Player,
    Ballpark,
    Schedule
}