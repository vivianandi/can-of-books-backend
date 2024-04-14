'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/books');

const app = express();

// Middleware - enabling your backend server to respond to requests from different origins
app.use(cors());

// Middleware - access to body of request
app.use(express.json());

// Handle the default route
app.get('/', (request, response) => {
  response.json({ message: 'This is the book server' });
});

// Route handler for fetching list of books
app.get('/books', async (request, response) => {
  try {
    // Fetch the list of books from the database
    const books = await Books.find({});
    // Send back the list of books as JSON
    response.json(books);
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Route handler for seeding the database with dummy data
app.get('/books/seed', async (request, response) => {
  try {
    // Seed the database with dummy data
    let results = await Books.seed();
    response.json({ message: results });
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Route handler for clearing the database
app.get('/books/nuke', async (request, response) => {
  try {
    // Clear the database
    let results = await Books.clear();
    response.json({ message: results });
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Route handler for creating a new book
app.post('/books', async (request, response) => {
  try {
    // Extract title and description from the request body
    const { title, description } = request.body;
    // Create a new book in the database
    const newBook = await Books.create({
      title,
      description,
      status: 'available'
    });
    // Send back the newly created book as JSON
    response.status(201).json(newBook);
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Route handler for deleting a book by ID
app.delete('/books/:id', async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;
    // Delete the book from the database
    const deletedBook = await Books.findByIdAndDelete(id);
    // If the book was not found, send back a 404 response
    if (!deletedBook) {
      return response.status(404).json({ message: 'Book not found' });
    }
    // Send back a success message
    response.json({ message: 'Book deleted successfully' });
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Route handler for updating a book by ID
app.put('/books/:id', async (request, response) => {
  try {
    // Extract the book ID from the request parameters
    const { id } = request.params;
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: 'Invalid book ID' });
    }
    // Update the book in the database
    const updatedBook = await Books.findByIdAndUpdate(id, request.body, { new: true });
    // If the book was not found, send back a 404 response
    if (!updatedBook) {
      return response.status(404).json({ message: 'Book not found' });
    }
    // Send back the updated book as JSON
    response.json(updatedBook);
  } catch (error) {
    // If there's an error, send back an error response
    response.status(500).json({ message: error.message });
  }
});

// Handle all unknown routes
app.get('*', (request, response) => {
  response.status(404).json({ message: 'Not Found' });
});

// Handle all errors
app.use((error, request, response) => {
  console.error(error);
  response.status(500).json({ message: 'Internal Server Error' });
});

// Function to start the server
function startServer() {
  const PORT = process.env.PORT || 3000;
  const DATABASE_URL = process.env.DATABASE_URL;

  console.log(DATABASE_URL);
  mongoose.connect(DATABASE_URL)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
      });
    })
    .catch(error => {
      console.error('Database connection error:', error);
    });
}

// Start the server
startServer();
