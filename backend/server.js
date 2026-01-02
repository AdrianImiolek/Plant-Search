// Import packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Create server
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Allow frontend to connect
app.use(express.json());  // Parse JSON

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Plant API Backend is running!' });
});

// Proxy route for plants
app.get('/api/plants', async (req, res) => {
  try {
    const { page = 1, q = '' } = req.query;
    
    // Build URL with YOUR API key (hidden from frontend!)
    let url = `https://perenual.com/api/v2/species-list?key=${process.env.API_KEY}`;
    if (q) url += `&q=${q}`;
    url += `&page=${page}`;
    
    console.log('Fetching:', url);
    
    // Fetch from Perenual
    const response = await fetch(url);
    const data = await response.json();
    
    // Send to frontend
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Server running on http://localhost:${PORT}`);
});