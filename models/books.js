const mongoose = require('mongoose');

// Define the schema for book

  title: String,
  description: String,
  status: {
    type: String,
    enum: ['available', 'checked-out', 'reserved'],
    default: 'available'
  }
});

// Define static methods for seeding and clearing the database
bookSchema.statics.seed = async function () {
  try {
    const Book = mongoose.model('Book'); // Define Book after it's defined
    await Book.deleteMany({}); // Clear existing books
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

// Define the Book model using the schema
const Book = mongoose.model('Book', bookSchema);

// Export the Book model
module.exports = Book;
=======
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['available', 'checked-out', 'reserved'],
        default: 'available'
    }
});

// Helper function to seed the database with sample books
// try...catch, you can catch any errors that occur during the execution of the function
bookSchema.statics.seed = async function () {
    try {
        // Create book instance and save -> instance can be changed
        const book1 = new Book({
            title: 'Book 1',
            description: 'Description of Book 1',
            status: 'available'
        });
        await book1.save();

        // Create book using Book.create -> straight up creates new
        await Book.create({
            title: 'Book 2',
            description: 'Description of Book 2',
            status: 'available'
        });

        await Book.create({
            title: 'Book 3',
            description: 'Description of Book 3',
            status: 'available'
        });

        return 'Seeded database with 3 books';
    } catch (error) {
        return error.message;
    }
};


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
