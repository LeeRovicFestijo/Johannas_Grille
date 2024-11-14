const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');

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
  database: 'johannasgrilledb',
  password: 'password',
  port: 5433, // Default PostgreSQL port
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

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key'; // Use your actual secret key

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If no token is present

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // If token is invalid
    req.user = user; // Save decoded user information in req.user
    next(); // Proceed to the next middleware or route handler
  });
};

const upload = multer({ storage });

app.post('/api/signup', async (req, res) => {
  const {firstname, lastname, address, email, phonenumber, username, password} = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
      const result = await pool.query(
          'INSERT INTO customertbl (firstname, lastname, address, email, phonenumber, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
          [firstname, lastname, address, email, phonenumber, username, hashedPassword]
      );
      res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (error) {
      console.error('Error details:', error);  // Add this to log the full error
      res.status(500).json({ message: 'Error registering user', error: error.message });  // Return error message
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM customertbl WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.customerid, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});


// --- API Endpoints ---
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usertbl WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Send back firstname, lastname, usertype, email, and image_url
    res.json({ 
      success: true, 
      firstname: user.firstname, 
      lastname: user.lastname, 
      usertype: user.usertype, 
      email: user.email, 
      image: user.image_url // Add image_url here
    });   
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Fetch all menu items
app.get('/api/menuitems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM menuitemtbl ORDER BY menuitemid');
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

// Insert Menu Items
app.post('/api/menuitems', upload.single('image'), async (req, res) => {
  const { name, price, category, availability } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO menuitemtbl (name, price, category, availability, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, category, availability, image_url]
    );
    res.status(201).json(result.rows[0]); // Return the newly added menu item
  } catch (err) {
    console.error('Error adding menu item:', err.message);
    res.status(500).send('Server error');
  }
});

// delete menu items

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

// Fetch all users by id
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await pool.query('SELECT * FROM usertbl WHERE userid = $1', [id]);
      if (result.rows.length > 0) {
          res.json(result.rows[0]); // Return the employee details
      } else {
          res.status(404).send('Employee not found');
      }
  } catch (err) {
      console.error('Error fetching employee details:', err.message);
      res.status(500).send('Server error');
  }
});


app.put('/api/employees/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  console.log("EmployeeId:", id);  // Log the ID
  const { firstname, lastname, email, username, branch } = req.body;
  console.log("Body data:", { firstname, lastname, email, username, branch });  // Log body data
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
      let query = 'UPDATE usertbl SET firstname = $1, lastname = $2, email = $3, username = $4, branch = $5';
      let values = [firstname, lastname, email, username, branch];

      if (image_url) {
          query += ', image_url = $6 WHERE userid = $7 RETURNING *';
          values.push(image_url, id);
      }
      query += ' WHERE userid = $6 RETURNING *'; // Use $7 for id
      values.push(id);

      const result = await pool.query(query, values);
      if (result.rows.length > 0) {
          res.json(result.rows[0]); // Return the updated item
      } else {
          res.status(404).send('Employee not found');
      }
  } catch (err) {
      console.error('Error updating employee details:', err.message);
      res.status(500).send('Server error');
  }
});


//add employee
app.post("/api/employeeadd", upload.single('image'), async (req, res) => {
  const {usertype, firstname, lastname, email, username, password, branch} = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const result = await pool.query(
      'INSERT INTO usertbl (usertype, firstname, lastname, email, username, password, branch, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [usertype, firstname, lastname, email, username, password, branch, image_url]
    );
    res.status(201).json(result.rows[0]); // Return the newly added menu item
  } catch (err) {
    console.error('Error adding employee:', err.message);
    res.status(500).send('Server error');
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

app.post("/api/reservations", async (req, res) => {
  const {numberofguests, reservationdate, reservationtime, branch} = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO reservationtbl (numberofguests, reservationdate, reservationtime, branch) VALUES ($1, $2, $3, $4) RETURNING *',
      [numberofguests, reservationdate, reservationtime, branch]
    );
    res.status(201).json(result.rows[0]); // Return the newly added menu item
  } catch (err) {
    console.error('Error adding reservation:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/customer', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customertbl ORDER BY customerid ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching menu items:', err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/customer/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM customertbl WHERE customerid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    console.error('Error fetching customer details:', err.message);
    res.status(500).send('Server error');
  }
});


app.put('/api/customer/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, address, email, phonenumber } = req.body;
  const image_url = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let query = 'UPDATE customertbl SET firstname = $1, lastname = $2, address = $3, email = $4, phonenumber = $5';
    let values = [firstname, lastname, address, email, phonenumber];

    if (image_url) {
      query += ', image_url = $6 WHERE customerid = $7 RETURNING *';
      values.push(image_url, id);
    } else {
      query += ' WHERE customerid = $6 RETURNING *';
      values.push(id);
    }

    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Return the updated item
    } else {
      res.status(404).send('Customer not found');
    }
  } catch (err) {
    console.error('Error updating customer details:', err.message);
    res.status(500).send('Server error');
  }
});

app.delete("/api/customer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM customertbl WHERE customerid = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/orders', async (req, res) => {
  const { orderid, items, total } = req.body;

  try {
      // Insert into orderstbl
      const orderResult = await new Promise((resolve, reject) => {
          db.query('INSERT INTO orderstbl (orderid, total) VALUES (?, ?)', [orderid, total], (error, results) => {
              if (error) return reject(error);
              resolve(results);
          });
      });

      // Insert into orderitemtbl for each item
      for (const item of items) {
          await new Promise((resolve, reject) => {
              db.query('INSERT INTO orderitemtbl (orderid, item_name, price) VALUES (?, ?, ?)', [orderid, item.name, item.price], (error, results) => {
                  if (error) return reject(error);
                  resolve(results);
              });
          });
      }

      res.status(201).json({ message: 'Order created successfully', orderid });
  } catch (error) {
      console.error('Error inserting order:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// POST endpoint to add items to an order
app.post('/api/orderitems', async (req, res) => {
  const { orderid, menuitemid, quantity, price } = req.body;

  try {
    // Insert into orderitemtbl
    const result = await pool.query(
      'INSERT INTO orderitemtbl (orderid, menuitemid, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [orderid, menuitemid, quantity, price]
    );

    res.status(201).json(result.rows[0]); // Return the newly added order item
  } catch (err) {
    console.error('Error adding order item:', err.message, err.stack);
    res.status(500).send('Server error');
  }
});

app.get('/api/orderitems/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM orderitemtbl WHERE orderitemid = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (err) {
    console.error('Error fetching customer details:', err.message);
    res.status(500).send('Server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

