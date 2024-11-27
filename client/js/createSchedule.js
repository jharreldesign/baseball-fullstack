document.getElementById('scheduleForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    
    const gameDate = document.getElementById('gameDate').value;
    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam').value;
    const ballpark = document.getElementById('ballpark').value;
  
    const schedule = { gameDate, homeTeam, awayTeam, ballpark };
  
    try {
      const response = await fetch('https://baseball-fullstack-server.onrender.com/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
      });
  
      if (response.ok) {
        const result = await response.json();
        document.getElementById('message').innerText = `Scheduled game created successfully: ${result.gameDate} - ${result.homeTeam} v. ${result.awayTeam} | ${result.ballpark}`;
      } else {
        const error = await response.text();
        document.getElementById('message').innerText = `Error: ${error}`;
      }
    } catch (err) {
      document.getElementById('message').innerText = `Error: ${err.message}`;
    }
  });