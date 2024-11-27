const db = require("../db");
const { Team, Ballpark } = require("../models");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  const teams = 
  [
    {
      "teamName": "Washington Nationals222",
      "city": "Washington",
      "state": "DC",
      "teamInitials": "WSH",
      "ballpark": "Nationals Park",

      "ballparkImage": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8hmzbXLT7dcffek-VLAjQQHaEK%26pid%3DApi&f=1&ipt=617f9783332ef3bdf393778d69cf3b8d8f5bddb9b0c9811d9de7b570ab2e026e&ipo=images",

      
      "teamLogo": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Toronto_Blue_Jay_Primary_Logo.svg/1920px-Toronto_Blue_Jay_Primary_Logo.svg.png"
    }
  ];  

  await Team.insertMany(teams);
  console.log("Created teams!");
};

const run = async () => {
  await main();
  db.close();
};

run();
