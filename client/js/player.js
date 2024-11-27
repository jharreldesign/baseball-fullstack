const fetchPlayers = async () => {
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = ''; 

    try {
        const players = await getPlayers(); 
        players.forEach(player => {
            console.log(player); 
            const playerCard = createPlayerCard(player); 
            if (playerCard) {
                playersContainer.appendChild(playerCard); 
            }
        });
    } catch (error) {
        console.error('Error fetching players:', error);
    }
};

const getPlayers = async () => {
    const response = await axios.get('https://baseball-fullstack-server.onrender.com/players');
    console.log(response.data);
    return response.data; 
};

const createPlayerCard = (player) => {
    const playerCard = document.createElement('div'); 
    playerCard.className = 'player-card'; 

    if (!player._id) {
        console.error('Player ID is missing:', player);
        return; 
    }

    playerCard.innerHTML = `
        <a href="playerProfile.html?id=${player._id}" class="player-card-link">
            <img src="${player.headshot}" alt="${player.firstName} ${player.lastName}" />
            <h3>${player.firstName} ${player.lastName}</h3>
            <p>Number: ${player.playerNumber || "N/A"}</p>
            <p>Position: ${player.position || "Unknown"}</p>
            <p>Current Team: ${player.currentTeam?.teamName || "Free Agent"}</p>
        </a>
    `;

    return playerCard; 
};

window.onload = fetchPlayers;
