'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/books');

const app = express();

//Middleware - enabling your backend server to respond to requests from different origins
app.use(cors());

//Middleware - access to body of request
app.use(express.json());

// Handle the default route
app.get('/', (request, response) => {
  response.json({ message: 'This is the book server' });
});

app.get('/books', handleGetBooks);
app.get('/books/seed', seedDatabase);
app.get('/books/nuke', emptyDatabase);

//Route handler - POST - creates a new book
app.post('/books', handleCreateBook);


// Handle all unknown routes
app.get('*', (request, response) => {
  response.status(404).json({ message: 'Not Found' });
});

// Handle all errors
app.use((error, request, response) => {
  console.error(error);
  response.status(500).json({ message: 'Internal Server Error' });
});

// Route Handlers
async function handleGetBooks(request, response) {
  try {
    // Get all the books from the database
    const books = await Books.find({});
    response.json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function seedDatabase(request, response) {
  try {
    let results = await Books.seed();
    response.json({ message: results });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

async function emptyDatabase(request, response) {
  try {
    let results = await Books.clear();
    response.json({ message: results });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}


//takes book data from the client request (title, desc..), create book in the database, sends resp of book or error
async function handleCreateBook(request, response) {
  console.log(request);
  console.log('response', response);
  try {
    // Check if request body is empty or doesn't contain required fields
    if (!request.body || !request.body.title || !request.body.description) {
      return response.status(400).json({ message: 'Title and description are required in the request body' });
    }

    // Extract book data from request body
    const { title, description } = request.body;

    // Create a new book in the database
    const newBook = await Books.create({
      title,
      description,
      status: 'available' // Assuming default status is 'available'
    });

    response.status(200).json(newBook);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}


// Connect to the database and start the server
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

startServer();
