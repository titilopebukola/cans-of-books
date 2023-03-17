export default function Home({ handleLocation, location, books, deleteBook, handleAddBook, form, handleChange }) {
  return (
    <div>
      <div className="filter-wrapper">
        <input onChange={handleLocation} value={location} placeholder="Filter by Location" />
      </div>

      {/* <div>
        <input type="text" value={letter} onChange={(handFilter) => setLetter(handFilter.target.value)} />
        <button onClick={handleFilter}>Filter Locations</button>
        <ul>
          {locations.map((location) => (
            <li key={location._id}>{location.name}</li>
          ))}
        </ul>
      </div> */}
      <div className="wrapper">
        {books.map((book, index) => {
          return (
            <div className="book-wrapper" key={index}>
              <h3>{book.name}</h3>
              <p>Author: {book.author}</p>
              <p>Genre: {book.genre}</p>
              <p>Location: {book.location}</p>
              <span onClick={() => deleteBook(book._id, book.name)}>X</span>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Add a Book</h2>
        <form className="book-form" onSubmit={handleAddBook}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author" />
          <input name="genre" value={form.genre} onChange={handleChange} placeholder="Genre" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
          <input name="ISBN" value={form.isbn} onChange={handleChange} placeholder="ISBN" />
          <button type="submit">Add Book</button>
        </form>
      </div>
    </div>
  );
}
