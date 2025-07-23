const Book = require('../models/Book');
const express = require('express');

const router = express.Router();

// Route to get all books
router.get('/', async (req, res) => {
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

// Route to create a book
router.post('/', async (req, res) => {
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

// Route to get a book by id
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title && !req.body.author && !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        const { title, author, publishYear } = req.body;
        const updatedBook = {}; // so that if its undefined, it will not be replaced
            if (title) updatedBook.title = title;
            if (author) updatedBook.author = author;
            if (publishYear) updatedBook.publishYear = publishYear;
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
router.delete('/:id', async (req, res) => {
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

module.exports = router;