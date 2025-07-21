require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const Book = require('./models/Book'); // Just loads schema

const app = express();
const port = process.env.PORT || 5000;

// Middleware for parsing
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(234).send("Hello")
});

// Route to create a book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title && !req.body.author && !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Route to get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            counts: books.length,
            data: books
        });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Route to get a book by id
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Route for Update a Book
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title && !req.body.author && !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const updates = {}; // so that if its undefined, it will not be replaced
            if (title) updates.title = title;
            if (author) updates.author = author;
            if (publishYear) updates.publishYear = publishYear;
        const { id } = req.params; 
        const finalBook = await Book.findByIdAndUpdate(id, updatedBook, {new: true});
        return res.status(200).send(finalBook);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Route for Delete Book
app.delete('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({message: 'Book not found'});
        }
        return res.status(200).send({message: 'Book deleted successfully'});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
        console.log('DB connected')
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error(err));
