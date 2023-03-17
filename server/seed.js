const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./server/models/book");

mongoose.connect(process.env.DATABASE_URL);

async function seed() {
  // create a new isntacne of a cat object and add to the DB
  await Book.create({
    name: "Charlottes's Web",
    author: "E.B White",
    genre: "fantasy",
    location: "Chester",
    isbn: true,
  });
  console.log("Created a new book");

  mongoose.disconnect();
}

seed();
