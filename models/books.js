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

// Clear the database
bookSchema.statics.clear = async function () {
    try {
        // Delete "many" books that match the {} filter query
        await Book.deleteMany({});
        return "Cleared the database";
    } catch (error) {
        return error.message;
    }
};

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;