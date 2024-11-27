document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed'); 
    const homeTeamSelect = document.getElementById('homeTeam');
    const awayTeamSelect = document.getElementById('awayTeam');
    const ballparkInput = document.getElementById('ballpark'); 
    const scheduleForm = document.getElementById('scheduleForm');
    let teams = []; 

    console.log('Attempting to fetch teams...');
    axios.get('http://localhost:3001/teams')
        .then(response => {
            console.log('Teams fetched:', response.data);
            teams = response.data; 

            if (Array.isArray(teams)) {
                teams.forEach(team => {
                    const optionHome = document.createElement('option');
                    optionHome.value = team._id; 
                    optionHome.textContent = team.teamName; 
                    homeTeamSelect.appendChild(optionHome); 

                    const optionAway = document.createElement('option');
                    optionAway.value = team._id; 
                    optionAway.textContent = team.teamName; 
                    awayTeamSelect.appendChild(optionAway); 
                });
            } else {
                console.error('Expected an array of teams but received:', teams);
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'No teams available.';
            }
        })
        .catch(error => {
            console.error('Error fetching teams:', error);
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Failed to load teams. Please try again later.';
        });

    homeTeamSelect.addEventListener('change', function () {
        const selectedTeamId = homeTeamSelect.value;
        const selectedTeam = teams.find(team => team._id === selectedTeamId); 

        if (selectedTeam) {
            ballparkInput.value = selectedTeam.ballpark || ''; 
        } else {
            ballparkInput.value = ''; 
        }
    });

    scheduleForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const gameDate = document.getElementById('gameDate').value;
        const gameTime = document.getElementById('gameTime').value;
        const homeTeam = homeTeamSelect.value;
        const awayTeam = awayTeamSelect.value;
        const ballpark = ballparkInput.value;

        const gameData = {
            gameDate,
            gameTime,
            homeTeam,
            awayTeam,
            ballpark
        };

        console.log('Submitting game data:', gameData); 

        axios.post('http://localhost:3001/schedules', gameData)
            .then(response => {
                console.log('Game scheduled successfully:', response.data);
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'Game scheduled successfully!';
                scheduleForm.reset(); 
            })
            .catch(error => {
                console.error('Error scheduling game:', error);
                const messageElement = document.getElementById('message');
                messageElement.textContent = 'Failed to schedule game. Please try again later.';
            });
    });
});
