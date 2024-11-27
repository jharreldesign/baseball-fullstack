const fetchTeams = async () => {
    try {
        const response = await axios.get('https://baseball-fullstack-server.onrender.com/teams'); 
        const teams = response.data; 
        console.log(response.data);

        const teamsContainer = document.getElementById('teamsContainer');
        teamsContainer.innerHTML = '';

        teams.forEach(team => {
            console.log(team);  
            const teamCardHTML = `
                <a href="teamProfile.html?id=${team._id}" class="team-card">
                    <img src="${team.teamLogo}" alt="${team.teamName}" class="teamLogo" /> 
                    <div>
                        <h3>${team.city} ${team.teamName}</h3>
                        <p>Ballpark: ${team.ballpark}</p>
                    </div>
                </a>
            `;
            teamsContainer.insertAdjacentHTML('beforeend', teamCardHTML);
        });
        
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
};

window.onload = fetchTeams;
