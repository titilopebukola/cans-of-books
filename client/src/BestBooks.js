import React, { useState, useEffect } from "react";
// import Carousel from "./Carousel";

function BestBooks(handleAddBook, form, handleChange) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/https://localhost:8080/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      <form className="book-form" onSubmit={handleAddBook}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Search a book" />

        <button type="submit">Search</button>
      </form>
      {books.length ? <p>Book Carousel coming soon</p> : <h3>No Books Found :(</h3>}
    </>
  );
}

export default BestBooks;
