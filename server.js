require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const Book = require('./models/books');

// Use CORS middleware
app.use(cors());


// Define the /books route
app.get('/books', async (req, res) => {
  try {
    // Retrieve all books from the database
    const books = await Book.find({});
    // Return the books as JSON in the response object
    res.json(books);
  } catch (error) {
    // If an error occurs, send a 500 status code and the error message
    res.status(500).json({ error: error.message });
  }
});


// Connect to the database and start the server
function startServer() {
  const PORT = process.env.PORT || 3000;
  const DATABASE_URL = process.env.DATABASE_URL;
  mongoose.connect(DATABASE_URL);
  app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });
}

startServer();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

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
