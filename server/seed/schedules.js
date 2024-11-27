const db = require('../db');
const { Ballpark, Team, Schedule } = require('../models'); 

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const chicagoCubs = await Team.findOne({ teamName: "Cubs" });

    const gameTime = new Date('2025-05-15T19:05:00Z');

    const schedules = [
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        {
            gameDate: gameTime,
            homeTeam: chicagoCubs._id,
            awayTeam: chicagoCubs._id,
            ballpark: "Wrigley Field"
        },
        
    ];

    await Schedule.insertMany(schedules);
    console.log('Created schedules!');
    console.log(schedules);
};

const run = async () => {
    await main();
    db.close();
};

run();
