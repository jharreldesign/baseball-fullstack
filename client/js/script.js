const fetchTeams = async () => {
  try {
    const response = await axios.get('https://baseball-fullstack-server.onrender.com/teams');
    const teams = response.data;

    const teamsContainer = document.getElementById('teamsContainer');
    teamsContainer.innerHTML = '';

    teams.forEach(team => {
      const teamCardHTML = `
        <a href="teamProfile.html?id=${team._id}" class="team-card">
          <img src="${team.teamLogo}" alt="${team.teamName}" class="teamLogo" />
          <div>
            <h3>${team.city} ${team.teamName}</h3>
          </div>
        </a>
      `;
      teamsContainer.insertAdjacentHTML('beforeend', teamCardHTML);
    });
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

const fetchSchedules = async () => {
  try {
    const response = await axios.get('https://baseball-fullstack-server.onrender.com/schedules');
    const schedules = response.data;
    console.log(response.data);

    const schedulesContainer = document.getElementById('schedulesContainer');
    schedulesContainer.innerHTML = '';

    schedules.forEach(schedule => {
      const gameDate = new Date(schedule.gameDate).toLocaleString("en-US", {
        weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
      });

      const scheduleCardHTML = `
        <a href="scheduleProfile.html?id=${schedule._id}" class="schedule-card">
          <img src="${schedule.homeTeam.teamLogo}" alt="${schedule.homeTeam.teamName}" class="teamLogo" />
          <div class="game-info">
            <h3>${schedule.homeTeam.teamName} vs ${schedule.awayTeam.teamName}</h3>
            <h4>${gameDate}</h4>
            <h5>Ballpark: ${schedule.ballpark || "Unknown"}</h5> <!-- Corrected this line -->
          </div>
          <img src="${schedule.awayTeam.teamLogo}" alt="${schedule.awayTeam.teamName}" class="teamLogo" />
        </a>
      `;
      schedulesContainer.insertAdjacentHTML('beforeend', scheduleCardHTML);
    });
  } catch (error) {
    console.error('Error fetching schedules:', error);
  }
};


const fetchPlayers = async () => {
  try {
    const response = await axios.get('https://baseball-fullstack-server.onrender.com/players');
    const players = response.data;
    console.log('Fetched players:', players); 

    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';

    players.forEach(player => {
      console.log('Player data:', player);

      const teamName = player.currentTeam?.teamName || "No Team Assigned";
      const playerCardHTML = `
        <a href="playerProfile.html?id=${player._id}" class="player-card">
          <img src="${player.headshot}" alt="${player.firstName} ${player.lastName}" class="playerLogo" />
          <div>
            <h3>${player.firstName} ${player.lastName}</h3>
            <p>Position: ${player.position || "Unknown"}</p>
            <p>Team: ${teamName}</p>
          </div>
        </a>
      `;
      playersContainer.insertAdjacentHTML('beforeend', playerCardHTML);
    });
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};


window.onload = () => {
  fetchTeams();
  fetchSchedules();
  fetchPlayers(); 
};
