const fetchSchedules = async () => {
  try {
    const response = await axios.get("https://baseball-fullstack-server.onrender.com/schedules");
    const schedules = response.data;

    const schedulesContainer = document.getElementById("schedulesContainer");
    schedulesContainer.innerHTML = ""; 

    if (schedules.length === 0) {
      document.getElementById("message").textContent = "No schedules available.";
      return;
    }

    schedules.forEach((schedule) => {
      const gameDate = new Date(schedule.gameDate).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Check if homeTeam and awayTeam exist before accessing properties
      const homeTeamLogo = schedule.homeTeam?.teamLogo || "default-home-logo.png";
      const homeTeamName = schedule.homeTeam?.teamName || "Unknown Home Team";
      const awayTeamLogo = schedule.awayTeam?.teamLogo || "default-away-logo.png";
      const awayTeamName = schedule.awayTeam?.teamName || "Unknown Away Team";
      const ballpark = schedule.ballpark || "Unknown Ballpark";

      const scheduleCardHTML = `
        <a href="scheduleProfile.html?id=${schedule._id}" class="schedule-card">
          <div>
            <h3>
              <img src="${homeTeamLogo}" alt="${homeTeamName} Logo" class="teamLogo" />
              ${homeTeamName} vs 
              ${awayTeamName} 
              <img src="${awayTeamLogo}" alt="${awayTeamName} Logo" class="teamLogo" />
            </h3>
            <h4>${gameDate}</h4>
            <h5>Ballpark: ${ballpark}</h5>
          </div>
        </a>
      `;

      schedulesContainer.insertAdjacentHTML("beforeend", scheduleCardHTML);
    });
  } catch (error) {
    console.error(
      "Error fetching schedules:",
      error.response ? error.response.data : error.message
    );
    document.getElementById("message").textContent =
      "Failed to load schedules. Please try again later.";
  }
};

// Fetch schedules and players on page load
window.onload = () => {
  fetchSchedules();
};
