require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// Use CORS middleware
app.use(cors());

// Endpoint to 
app.get('/this is endpoint', async (req, res) => {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'Please provide a parameter.' });
    }
    try {
      const weatherData = await fetchWeatherData(city);
      const forecasts = .map();
      res.status(200).json();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });