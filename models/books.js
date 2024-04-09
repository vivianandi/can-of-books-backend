const mongoose = require('mongoose');

// Define the schema for books
const bookSchema = new mongoose.Schema({
title: {
    type: String,
    required: true
},
description: placeholder 
    type: String,
    required: true
},
status: {
    type: String,
    enum: ['available', 'checked-out', 'reserved'],
    default: 'available'

});

await book1.save();
await Book.create
// Create a model based on the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Books;
