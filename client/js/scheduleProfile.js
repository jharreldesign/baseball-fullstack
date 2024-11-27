const getGameIdFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); 
};

const fetchGameDetails = async () => {
    const gameId = getGameIdFromUrl(); 

    if (!gameId) {
        console.error('Game ID is missing from the URL');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3001/schedules/${gameId}`);
        const game = response.data;

        if (!game) {
            console.error('Game not found');
            return;
        }

        const homeTeamResponse = await axios.get(`http://localhost:3001/teams/${game.homeTeam._id}`);
        const awayTeamResponse = await axios.get(`http://localhost:3001/teams/${game.awayTeam._id}`);
        
        const homeTeam = homeTeamResponse.data;
        const awayTeam = awayTeamResponse.data;

        displayGameDetails(game, homeTeam, awayTeam);

        fetchPlayersForTeams(homeTeam._id, awayTeam._id);
    } catch (error) {
        console.error('Error fetching game details:', error);
    }
};

const fetchPlayersForTeams = async (homeTeamId, awayTeamId) => {
    try {
        const playersResponse = await axios.get('http://localhost:3001/players');
        const players = playersResponse.data;

        const homeTeamPlayers = players.filter(player => player.currentTeam && player.currentTeam._id === homeTeamId);
        const awayTeamPlayers = players.filter(player => player.currentTeam && player.currentTeam._id === awayTeamId);

        displayPlayers(homeTeamPlayers, 'homeTeamPlayersContainer');
        displayPlayers(awayTeamPlayers, 'awayTeamPlayersContainer');
    } catch (error) {
        console.error('Error fetching players:', error);
    }
};

const displayGameDetails = (game, homeTeam, awayTeam) => {
    document.getElementById('homeTeamName').textContent = homeTeam.teamName; 
    document.getElementById('awayTeamName').textContent = awayTeam.teamName; 
    document.getElementById('homeTeamLogo').src = homeTeam.teamLogo; 
    document.getElementById('awayTeamLogo').src = awayTeam.teamLogo; 
    document.getElementById('gameDate').textContent = new Date(game.gameDate).toLocaleString();
    document.getElementById('ballpark').textContent = homeTeam.ballpark; 

    document.getElementById('ballparkImage').src = homeTeam.ballparkImage; 
    console.log(game); 
};

const displayPlayers = (players, containerId) => {
    const playersContainer = document.getElementById(containerId);
    playersContainer.innerHTML = ''; 

    if (!players || players.length === 0) {
        playersContainer.innerHTML = '<p>No players assigned to this team.</p>';
        return;
    }

    players.forEach(player => {
        const playerCard = createPlayerCard(player);
        playersContainer.appendChild(playerCard);
    });
};

const createPlayerCard = (player) => {
    const playerCard = document.createElement('div');
    playerCard.className = 'player-card';

    playerCard.innerHTML = `
      <a href="playerProfile.html?id=${player._id}" class="player-card-link">
        <img src="${player.headshot}" alt="${player.firstName} ${player.lastName}" />
        <h3>${player.playerNumber} ${player.firstName} ${player.lastName}</h3>
        <p>${player.position || 'N/A'}</p>
      </a>
    `;

    return playerCard;
};

window.onload = fetchGameDetails;
