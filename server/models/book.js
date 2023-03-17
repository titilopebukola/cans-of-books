const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  author: String,
  genre: String,
  location: String,
  isbn: Boolean,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
