const express = require("express")
const cors = require('cors')
const PORT = process.env.PORT || 3001
const db = require("./db")
const app = express()
const teamController = require("./controllers/teamController");
const ballparkController = require("./controllers/ballparkController");
const playerController = require("./controllers/playerController");
const scheduleController = require("./controllers/scheduleController");

app.use(express.json());
// app.use(logger("dev"));
// app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a Baseball Root");
});

app.get("/teams", teamController.getAllTeams);
app.get("/players", playerController.getAllPlayers);
app.get("/ballparks", ballparkController.getAllBallparks);
app.get("/schedules", scheduleController.getAllSchedules);

app.get('/teams/:teamId/players', async (req, res) => {
  try {
    const players = await Player.find({ team: req.params.teamId });
    res.json(players);
  } catch (error) {
    res.status(500).send('Error fetching players.');
  }
});


app.get("/teams/name/:teamName", teamController.getTeamByName);

// CRUD routes
app.post("/teams", teamController.createTeam);
app.post("/players", playerController.createPlayer);
app.post("/ballparks", ballparkController.createBallpark);
app.post("/schedules", scheduleController.createSchedule);


app.delete("/teams/:id", teamController.deleteTeam);
app.delete("/players/:id", playerController.deletePlayer);
app.delete("/ballparks/:id", ballparkController.deleteBallpark);
app.delete("/schedules/:id", scheduleController.deleteSchedule);

app.get("/teams/:id", teamController.getTeamById);
app.get("/ballparks/:id", ballparkController.getBallparkByName);
app.get("/players/:id", playerController.getPlayerById);
app.get("/schedules/:id", scheduleController.getScheduleById);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})
