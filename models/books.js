const mongoose = require('mongoose');

// Define the schema for book
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['available', 'checked-out', 'reserved'],
    default: 'available'
  }
});

bookSchema.statics.seed = async function () {
  try {
    const Book = mongoose.model('Book');
    await Book.deleteMany({});
    await Book.create([
      {
        title: 'Book 1',
        description: 'Description of Book 1',
        status: 'available'
      },
      {
        title: 'Book 2',
        description: 'Description of Book 2',
        status: 'available'
      },
      {
        title: 'Book 3',
        description: 'Description of Book 3',
        status: 'available'
      }
    ]);
    return 'Seeded database with 3 books';
  } catch (error) {
    return error.message;
  }
};

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
