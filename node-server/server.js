const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'johannasdb',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

// Endpoint for Sign Up
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT firstname, lastname, usertype, password, email FROM usertbl WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Send back firstname, lastname, usertype, and email
    res.json({ 
      success: true, 
      firstname: user.firstname, 
      lastname: user.lastname, 
      usertype: user.usertype, 
      email: user.email // This should return the correct email value
   });   
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
