const fetchPlayerProfile = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id'); 
    console.log(playerId);

    if (!playerId) {
        console.error('Player ID not specified in the URL.');
        return;
    }

    try {
        const response = await axios.get(`https://baseball-fullstack-server.onrender.com/players/${playerId}`);
        const player = response.data;

        if (player) {
            document.getElementById('headshot').src = player.headshot || ''; 
            document.getElementById('actionPhoto').src = player.actionPhoto || ''; 
            document.getElementById('playerName').textContent = `${player.firstName} ${player.lastName}`; 
            document.getElementById('hometown').textContent = `Hometown: ${player.hometown}, ${player.state}`;
            document.getElementById('playerNumber').textContent = `#${player.playerNumber}`;
            document.getElementById('hits').textContent = `Hits: ${player.hits || 'N/A'}`; 
            document.getElementById('throws').textContent = `Throws: ${player.throws || 'N/A'}`; 
            document.getElementById('debut').textContent = `Debut: ${player.debut || 'N/A'}`; 
            
            const careerStatsBody = document.getElementById('careerStatsBody');
            careerStatsBody.innerHTML = ''; 
            player.careerStats.forEach(stat => {
                const row = `<tr>
                    <td>${stat.year}</td>
                    <td>${stat.games}</td>
                    <td>${stat.average}</td>
                    <td>${stat.homeRuns}</td>
                    <td>${stat.rbis}</td>
                </tr>`;
                careerStatsBody.innerHTML += row;
            });

            const recentPerformanceBody = document.getElementById('recentPerformanceBody');
            recentPerformanceBody.innerHTML = ''; 
            player.recentPerformance.forEach(performance => {
                const row = `<tr>
                    <td>${performance.date}</td>
                    <td>${performance.opponent}</td>
                    <td>${performance.result}</td>
                    <td>${performance.hits}</td>
                    <td>${performance.rbis}</td>
                </tr>`;
                recentPerformanceBody.innerHTML += row;
            });

        } else {
            console.error('No player found with the provided ID.');
        }
    } catch (error) {
        console.error('Error fetching player profile:', error);
    }
};

window.onload = fetchPlayerProfile;
