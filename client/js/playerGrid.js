const fetchPlayers = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/players`);
        const players = response.data;
        populatePlayersTable(players);
    } catch (error) {
        console.error('Error fetching players:', error);
    }
};

const populatePlayersTable = (players) => {
    const playersTableBody = document.getElementById('playersTableBody');
    playersTableBody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${player.headshot || 'path/to/default/headshot.jpg'}" alt="${player.firstName} ${player.lastName}" class="player-headshot" /></td>
            <td>${player.firstName} ${player.lastName}</td>
            <td>${player.position || 'N/A'}</td>
            <td>${player.bats || 'N/A'}</td>
            <td>${player.throws || 'N/A'}</td>
            <td>${player.number || 'N/A'}</td>
        `;

        playersTableBody.appendChild(row);
    });
};

window.onload = fetchPlayers;
