const db = require('../db');
const { Ballpark, Team } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const losAngelesAngels = await Team.findOne({ teamName: "Los Angeles Angels" });
    const newYorkYankees = await Team.findOne({ teamName: "New York Yankees" });
    
    const ballparks = [
        {
            ballparkName: "Angel Stadium",
            address: [
                {
                    street: "2000 E Gene Autry Way",
                    city: "Anaheim",
                    state: "CA",
                    zip: 92806
                }
            ],
            ballparkOpen: "1966",
            capacity: 45017,
            teamLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Toronto_Blue_Jay_Primary_Logo.svg/1920px-Toronto_Blue_Jay_Primary_Logo.svg.png",
            ballparkImg: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Toronto_Blue_Jay_Primary_Logo.svg/1920px-Toronto_Blue_Jay_Primary_Logo.svg.png",
            teams: [losAngelesAngels._id] 
        },
        // {
        //     ballparkName: "Yankee Stadium",
        //     address: [
        //         {
        //             street: "1 E 161st St",
        //             city: "Bronx",
        //             state: "NY",
        //             zip: 10451
        //         }
        //     ],
        //     ballparkOpen: "2009",
        //     capacity: 54051,
        //     ballparkImg: "https://example.com/images/yankee_stadium.jpg",
        //     teams: [newYorkYankees._id] // Reference the ObjectId of the team
        // }
    ];

    await Ballpark.insertMany(ballparks);
    console.log('Created ballparks!');
    console.log(ballparks);
};

const run = async () => {
    await main();
    db.close();
};

run();
