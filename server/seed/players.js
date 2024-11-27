const db = require('../db');
const { Player, Team } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
    const losAngelesAngels = await Team.findOne({ teamName: "Los Angeles Angels" });

    const players = [
        {
            firstName: "Mike",
            lastName: "Trout",
            currentTeam: losAngelesAngels._id, 
            playerNumber: 27,
            position: "Center Fielder",
            throws: true,
            hits: true,
            hometown: "Vineland",
            state: "NJ",
            headshot: "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_213,q_auto:best/v1/people/545361/headshot/67/current",
            actionPhoto: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fontapsportsnet.com%2F.image%2Far_1.91%252Cc_fill%252Ccs_srgb%252Cfl_progressive%252Cg_xy_center%252Cq_auto%3Agood%252Cw_1200%252Cx_3998%252Cy_1494%2FMTk2NDM4NjMzODcwMzM3MTc0%2Fpete-crow-armstrong-spring-training.jpg&f=1&nofb=1&ipt=e7f8ac2c3c78d5efa75b22350fb0cf92d5b738f4cb1b819cfde2503d78312567&ipo=images",
            debut: 2011
        }
    ];

    await Player.insertMany(players);
    console.log('Created player!');
    console.log(players);
};

const run = async () => {
    await main();
    db.close();
};

run();
