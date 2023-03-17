import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const [book, setBook] = useState({});
  const [form, setForm] = useState({
    name: "",
    author: "",
    genre: "",
    location: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    const API = `http://localhost:8080/books?_id=${id}`;
    const res = await axios.get(API);
    setBook(res.data[0]);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleUpdateBook(event) {
    event.preventDefault();
    const body = {};
    // go through property item in the object
    for (const prop in form) {
      // if the property is not empty, then add it to our body object
      if (form[prop]) {
        body[prop] = form[prop];
      }
    }
    // so we end up with a body object which is only the fields the user has type in
    const API = `http://localhost:8080/books/${id}`;
    await axios.put(API, body);

    const newBook = { ...book, ...body };
    setBook(newBook);
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.location}</p>
      <p>{book.color}</p>
      <h3>Update details of Book</h3>
      <form onSubmit={handleUpdateBook}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
        <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        <input name="ISBN" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
