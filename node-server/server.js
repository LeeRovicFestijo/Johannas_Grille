const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'johannasgrille',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

// Endpoint for Sign Up
app.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, password, address]
    );
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error during sign up' });
  }
});

// Endpoint for Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
      }
  
      // Check if the plain text password matches
      if (user.password !== password) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
  
      // If login is successful, send the user's role as well
      res.json({ success: true, role: user.role });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
