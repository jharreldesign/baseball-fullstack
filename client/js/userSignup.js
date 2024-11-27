document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const user = { name, email, password };
  
    try {
      const response = await fetch('https://baseball-fullstack-server.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
  
      if (response.ok) {
        const result = await response.json();
        document.getElementById('message').innerText = `User created successfully: ${result.name}`;
      } else {
        const error = await response.text();
        document.getElementById('message').innerText = `Error: ${error}`;
      }
    } catch (err) {
      document.getElementById('message').innerText = `Error: ${err.message}`;
    }
  });