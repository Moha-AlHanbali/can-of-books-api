'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BooksData', {useNewUrlParser: true, useUnifiedTopology: true});


    // Book Schema
// ------------------------------

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    email: String,
  });


    // Book Model
// ------------------------------

const bookModel = mongoose.model('Book', bookSchema);


module.exports = bookModel;