const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');

// Initialize express app
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images statically

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'johannasdb',
  password: 'password',
  port: 5432, // Default PostgreSQL port
});

// Multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the 'uploads/' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  }
});

const upload = multer({ storage });

// --- API Endpoints ---
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

// Fetch all menu items
app.get('/api/menuitems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menuitemtbl');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).send('Server error');
  }
});



// Fetch a single menu item by ID
app.get('/api/menuitems/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM menuitemtbl WHERE menuitemid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error fetching menu item:', err.message);
    res.status(500).send('Server error');
  }
});

// Update a menu item by ID
app.put('/api/menuitems/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  console.log("Menu Item ID:", id);  // Log the ID
  const { name, price, category } = req.body;
  console.log("Body data:", { name, price, category });  // Log body data
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let query = 'UPDATE menuitemtbl SET name = $1, price = $2, category = $3';
    let values = [name, price, category];

    if (image_url) {
      query += ', image_url = $4 WHERE menuitemid = $5 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE menuitemid = $4 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Return the updated item
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error updating menu item:', err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM menuitemtbl WHERE menuitemid = $1 RETURNING *', [id]);

    if (result.rows.length > 0) {
      res.json({ message: 'Product deleted successfully', item: result.rows[0] });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// Fetch distinct categories
app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM menuitemtbl');
    res.json(result.rows.map(row => row.category));
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/menuitems', upload.single('image'), async (req, res) => {
  const { name, price, category } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO menuitemtbl (name, price, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, price, category, image_url]
    );
    res.status(201).json(result.rows[0]); // Return the newly added menu item
  } catch (err) {
    console.error('Error adding menu item:', err.message);
    res.status(500).send('Server error');
  }
});

// Fetch all users
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usertbl');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM usertbl WHERE userid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error fetching menu item:', err.message);
    res.status(500).send('Server error');
  }
});


app.put("/api/employeesedit/:id", async (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id, 10);
  const { firstname, lastname, email, usertype, branchid } = req.body;

  console.log("ID received in URL:", id);
  console.log("Data received in body:", req.body);

  try {
    const result = await pool.query(
      `UPDATE usertbl 
       SET firstname = $1, lastname = $2, email = $3, usertype = $4, branchid = $5 
       WHERE userid = $6 
       RETURNING *`,
      [firstname, lastname, email, usertype, branchid, employeeId]
    );

    if (result.rows.length === 0) {
      console.log("Employee not found for ID:", id); // Debug log
      return res.status(404).json({ error: "Employee not found" });
    }

    console.log("Employee updated successfully:", result.rows[0]); // Debug log
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE employee by ID
app.delete("/api/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM usertbl WHERE userid = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservationtbl');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reservationtbl WHERE reservationid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Menu item not found');
    }
  } catch (err) {
    console.error('Error fetching menu item:', err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

