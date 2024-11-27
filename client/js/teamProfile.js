const fetchTeamProfileAndPlayers = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    if (!teamId) {
        console.error('Team ID not specified in the URL.');
        return;
    }

    try {
        const teamResponse = await axios.get(`https://baseball-fullstack-server.onrender.com/teams/${teamId}`);
        const team = teamResponse.data;

        console.log('Fetched team:', team);
        if (team) {
            updateTeamProfileUI(team);

            const playersResponse = await axios.get(`https://baseball-fullstack-server.onrender.com/players`);
            const players = playersResponse.data;

            console.log('Fetched players:', players);

            const teamPlayers = players.filter(player => player.currentTeam && player.currentTeam._id === teamId);
            console.log('Filtered team players:', teamPlayers);

            populatePlayersTable(teamPlayers);
        } else {
            console.error('No team found with the provided ID.');
        }
    } catch (error) {
        console.error('Error fetching team profile or players:', error);
    }
};

const populatePlayersTable = (players) => {
    const playersTableBody = document.getElementById('playersTableBody');
    playersTableBody.innerHTML = ''; // Clear existing content

    players.forEach(player => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${player.headshot || 'path/to/default/headshot.jpg'}" alt="${player.firstName} ${player.lastName}" class="player-headshot" /></td>
            <td>${player.firstName} ${player.lastName}</td>
            <td>${player.position || 'N/A'}</td>
            <td>${player.bats || 'N/A'}</td>
            <td>${player.throws || 'N/A'}</td>
            <td>${player.playerNumber || 'N/A'}</td>
            <td>
                <button class="editPlayerButton" data-id="${player._id}">Edit</button>
                <button class="deletePlayerButton" data-id="${player._id}">Delete</button>
            </td>
        `;

        playersTableBody.appendChild(row);
    });
};

const updateTeamProfileUI = (team) => {
    document.getElementById('teamName').textContent = `${team.city.toUpperCase()} ${team.teamName.toUpperCase() || 'Team Name Not Available'}`;
    document.getElementById('city').textContent = `${team.city || 'N/A'}, ${team.state || 'N/A'}`;
    document.getElementById('teamInitials').textContent = `Team Initials: ${team.teamInitials || 'N/A'}`;
    document.getElementById('ballpark').textContent = `Ballpark: ${team.ballpark || 'N/A'}`;
    document.getElementById('teamLogo').src = `${team.teamLogo}` || ''; // Ensure logo is set correctly
    document.getElementById('ballparkImage').src = team.ballparkImage || 'path/to/default/ballpark.jpg';
};

document.getElementById('editTeamButton').addEventListener('click', () => {
    alert('Edit team functionality to be implemented!');
});

document.getElementById('deleteTeamButton').addEventListener('click', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get('id');

    const confirmation = confirm('Are you sure you want to delete this team?');
    if (confirmation) {
        try {
            await axios.delete(`https://baseball-fullstack-server.onrender.com/teams/${teamId}`);
            alert('Team deleted successfully.');
            window.location.href = './teams.html'; // Redirect after deletion
        } catch (error) {
            console.error('Error deleting team:', error);
            alert('Failed to delete the team.');
        }
    }
});

fetchTeamProfileAndPlayers();
