require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define your mongoose schema and model if needed










// // Define your endpoint
// app.get('/books', (req, res) => {
//     res.json({ message: 'This is the homepage' });
// });

// // Handle all other routes
// app.get('*', (req, res) => {
//     res.status(404).json({ message: 'Not Found' });
// });

// // Error handler middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Something went wrong!' });
// });

// app.listen(port, () => {
// console.log(`Server is running on port ${port}`);
// });
