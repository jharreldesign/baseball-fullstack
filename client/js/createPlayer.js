const fetchTeams = async () => {
  try {
      const response = await axios.get('https://baseball-fullstack-server.onrender.com/teams'); 
      const teams = response.data;

      const teamSelect = document.getElementById('team');
      
      teamSelect.innerHTML = '<option value="">Select a team</option>';
      
      teams.forEach(team => {
          const option = document.createElement('option');
          option.value = team._id; 
          option.textContent = team.teamName; 
          teamSelect.appendChild(option);
      });
  } catch (error) {
      console.error('Error fetching teams:', error);
  }
};

const handleFormSubmit = async (event) => {
  event.preventDefault(); 

  const playerData = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      currentTeam: document.getElementById('team').value,
      playerNumber: document.getElementById('playerNumber').value,
      position: document.getElementById('position').value,
      throws: document.getElementById('throws').value === 'right', 
      hits: document.getElementById('hits').value === 'right', 
      hometown: document.getElementById('hometown').value,
      state: document.getElementById('state').value,
      headshot: document.getElementById('headshot').value,
      debut: document.getElementById('debut').value,
      actionPhoto: document.getElementById('actionPhoto').value 
  };

  try {
      const response = await axios.post('https://baseball-fullstack-server.onrender.com/players', playerData);
      document.getElementById('message').textContent = 'Player created successfully!'; 
      document.getElementById('playerForm').reset(); 
  } catch (error) {
      console.error('Error creating player:', error);
      document.getElementById('message').textContent = 'Error creating player: ' + error.message; 
  }
};

window.onload = () => {
  fetchTeams();
  const playerForm = document.getElementById('playerForm');
  playerForm.addEventListener('submit', handleFormSubmit);
};
