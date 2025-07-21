require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const booksRoute = require('./routes/booksRoute')
const port = process.env.PORT || 5500;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/books', booksRoute);

app.get('/', (req, res) => {
    return res.status(234).send("Welcome to Book MERN Stack!")
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
        console.log('DB connected')
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch(err => console.error(err));
