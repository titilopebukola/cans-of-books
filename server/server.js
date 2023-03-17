require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Book = require("./models/book");
const bp = require("body-parser");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bp.json()); // allows us access to the request.body

// connect to the databse (pretty important step)
mongoose
  .connect(
    process.env.DATABASE_URL,
    // added this curly bracket
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(async () => {
    const booksCount = await Book.countDocuments();
    booksCount === 0
      ? (await Book.insertMany(require("./seed"))) && console.log("Database seeded successfully!")
      : console.log(`The 'books' collection already has ${booksCount} documents.`);
  })
  .catch((error) => console.log(error));

// READ
app.get("/books", async (request, response) => {
  console.log("Query String: ", request.query); // { color: "black" }

  // try to do this code, but if it errors, instead of crashing the server, stop, and move to the catch
  try {
    const books = await Book.find(request.query);
    response.status(200).json(books);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
});

// CREATE
app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.status(200).json(newBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// DELETE
app.delete("/books/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const deletedBook = await Book.findByIdAndDelete(id);
    response.status(200).send(deletedBook);
  } catch (error) {
    console.log(error);
    response.json(error);
  }
});

// update
app.put("/books/:id", async (request, response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

// added filter location
const locationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
});

const Location = mongoose.model("Location", locationSchema);

app.get("/locations", async (req, res) => {
  const { letter } = req.query;

  try {
    const locations = await Location.find({
      name: { $regex: new RegExp(`^${letter}`, "i") },
    }).sort({ name: 1 });

    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

/*

  Query
  /cats?location=Leicester

  Params
  /cats/leicester

  Body (in the call on the front end)
  { location: "Leicester" }

*/
