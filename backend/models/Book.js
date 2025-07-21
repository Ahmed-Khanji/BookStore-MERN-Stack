const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: {type: String, unique: true, required: true},
        author: {type: String, required: true},
        publishYear: {type: Number, required: true},
    },
    { 
        timestamps: true 
    } 
);

module.exports = mongoose.model('Book', bookSchema);