'use strict';

const mongoose = require('mongoose');

mongoose.connect(`${process.env.DATABASE_URL}`, {useNewUrlParser: true, useUnifiedTopology: true});


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