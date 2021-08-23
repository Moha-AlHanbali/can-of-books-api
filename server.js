'use strict';

const express = require('express');

const cors = require('cors');

const axios = require('axios');

const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT;

const server = express();

const bookModel = require('./Modules/BookData.js');

server.use(cors());

mongoose.connect('mongodb://localhost:27017/BooksData', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });


// Seeding Collections
// ------------------------------

let seedBookData = () => {

  const book1 = new bookModel({
    title: 'Book 1',
    description: 'Book 1 description',
    status: 'Book 1 status',
    email: 'moha.alhanbali@gmail.com',
  })

  const book2 = new bookModel({
    title: 'Book 2',
    description: 'Book 2 description',
    status: 'Book 2 status',
    email: 'moha.alhanbali@gmail.com',
  })

  const book3 = new bookModel({
    title: 'Book 3',
    description: 'Book 3 description',
    status: 'Book 3 status',
    email: 'moha.alhanbali@gmail.com',
  })

  const book4 = new bookModel({
    title: 'Book 4',
    description: 'Book 4 description',
    status: 'Book 4 status',
    email: 'moha.alhanbali@gmail.com',
  })
  book1.save();
  book2.save();
  book3.save();
  book4.save();
}

// seedBookData();



// Handlers
// ------------------------------

let testHandler = ((req, res) => {
  res.send('TEST PAGE');
});

let booksHandler = ((req, res) => {
  // let booksQuery = req.query.q;

  bookModel.find({}, (error, booksData) => {
    if (error) {
      console.log('error in getting books data')
      res.send(error);
    } else {
      res.send(booksData);
    }
  })

});

// Routes
// ------------------------------

server.get('/test', testHandler);
server.get('/books', booksHandler);



server.listen(PORT, () => {
  console.log('up and listening on port ', PORT);
});