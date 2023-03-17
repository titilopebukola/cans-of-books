import "./Style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";

import BestBooks from "./BestBooks";
import About from "./About";
import BookDetails from "./BookDetails";

function App() {
  const [books, setBooks] = useState([]);
  const [location, setLocation] = useState("");
  // const [letter, setLetter] = useState("");
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    isbn: true,
  });

  useEffect(() => {
    getBooks();
  }, [location]);

  async function getBooks() {
    let API = "http://localhost:8080/books";

    if (location !== "") {
      API = API + "?location=" + location;
    }
    const res = await axios.get(API);
    console.log(res.data);
    setBooks(res.data);
  }

  function handleLocation(event) {
    setLocation(event.target.value);
  }
  z;

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    // console.log(form);
  }

  async function handleAddBook(event) {
    event.preventDefault();
    const API = "http://localhost:8080/books";
    const res = await axios.post(API, form);

    // add our new book to the page
    const newBooksList = [...books, res.data];
    setBooks(newBooksList);

    // reset the form
    setForm({
      name: "",
      author: "",
      genre: "",
      location: "",
      isbn: true,
    });
  }

  async function deleteBook(id, name) {
    const confirmDelete = window.confirm(`Are you sure you want to permantently delete ${name}?`);
    if (confirmDelete) {
      const API = `http://localhost:8080/books/${id}`;
      const res = await axios.delete(API);
      console.log(res);
      getBooks();
    }
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <h1>Books</h1>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleLocation={handleLocation}
                location={location}
                books={books}
                deleteBook={deleteBook}
                handleAddBook={handleAddBook}
                form={form}
                handleChange={handleChange}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/bestbooks" element={<BestBooks />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
