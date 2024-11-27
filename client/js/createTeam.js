const handleTeamFormSubmit = async (event) => {
  event.preventDefault(); 

  const teamData = {
    teamName: document.getElementById('teamName').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    teamInitials: document.getElementById('teamInitials').value,
    ballpark: document.getElementById('ballpark').value,
    teamLogo: document.getElementById('teamLogo').value,
    ballparkImage: document.getElementById('ballparkImage').value
  };

  try {
    const response = await axios.post('https://baseball-fullstack-server.onrender.com/teams', teamData);
    document.getElementById('message').textContent = 'Team created successfully!'; 
    document.getElementById('teamForm').reset(); 
  } catch (error) {
    console.error('Error creating team:', error);
    document.getElementById('message').textContent = 'Error creating team: ' + error.message; 
  }
};

window.onload = () => {
  const teamForm = document.getElementById('teamForm');
  teamForm.addEventListener('submit', handleTeamFormSubmit);
};
