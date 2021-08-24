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

server.use(express.json());

mongoose.connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true, useUnifiedTopology: true });

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

  const book5 = new bookModel({
    title: 'Book 5',
    description: 'Book 5 description',
    status: 'Book 5 status',
    email: 'should-not-appear@error.test',
  })
  // book1.save();
  // book2.save();
  // book3.save();
  // book4.save();
  // book5.save();
}

// seedBookData();



// Handlers
// ------------------------------

let testHandler = ((req, res) => {
  res.send('TEST PAGE');
});


let booksHandler = ((req, res) => {
  let userBooksQuery = req.query.userBooks;

  bookModel.find({ email: userBooksQuery }, (error, booksData) => {
    if (error) {
      console.log('error in getting books data')
      res.send(error);
    } else {
      res.send(booksData);
    }
  })

});


let addBookHandler = (async (req, res) => {

  console.log(req.body);

  let title = req.body.params.title;
  let description = req.body.params.description;
  let status = req.body.params.status;
  let email = req.body.params.email;

  await bookModel.create({ title, description, status, email });

  bookModel.find({ email: email }, (error, booksData) => {
    if (error) {
      console.log('error in adding books data')
      res.send(error);
    } else {
      res.send(booksData);
    }
  });

});


let deleteBookHandler = (async (req, res) => {

  console.log('where', req.params.id);

  let userBooksQuery = req.query.userBooks;

  let bookID = req.params.id;

  bookModel.deleteOne({ _id: bookID }, (error, deletedBook) => {
    if (error) {
      console.log('error in deleting books data')
      res.send(error);
    } else {

      console.log(deletedBook);

      bookModel.find({ email: userBooksQuery }, (error, booksData) => {
        if (error) {
          console.log('error in adding books data')
          res.send(error);
        } else {
          res.send(booksData);
        }
      });
    }
  })
});


// Routes
// ------------------------------

server.get('/test', testHandler);
server.get('/books', booksHandler);
server.post('/books', addBookHandler);
server.delete('/books/:id', deleteBookHandler);


server.listen(PORT, () => {
  console.log('up and listening on port ', PORT);
});