import { useState } from "react";
import { API } from "../apis/api";
import { getToken } from "../utils/common";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar";
const AddData = () => {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    subtitle: "",
    author: "",
    published: "",
    publisher: "",
    pages: 0,
    description: "",
    website: "",
  });
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      isbn: book.isbn,
      title: book.title,
      subtitle: book.subtitle,
      author: book.author,
      published: book.published,
      publisher: book.publisher,
      pages: book.pages,
      description: book.description,
      website: book.website,
    };
    if (book.isbn === "") {
      alert("please input your isbn");
    } else {
      await API.post("api/books/add", body, config)
        .then(() => {
          navigate("/home", { replace: true });
        })
        .catch((err) => {
          const errorResponse = err.response;
          console.log(errorResponse);
        });
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-3">Add Book</h2>
        <div className="mb-3">
          <label className="form-label">ISBN</label>
          <input
            type="text"
            className="form-control"
            id="isbn"
            value={book.isbn}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, isbn: e.target.value }));
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="title"
            className="form-control"
            id="title"
            value={book.title}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Subtitle</label>
          <input
            type="text"
            className="form-control"
            id="subtitle"
            value={book.subtitle}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, subtitle: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={book.author}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, author: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Published</label>
          <input
            type="date"
            className="form-control"
            id="published"
            value={book.published}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, published: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Publisher</label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            value={book.publisher}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, publisher: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pages</label>
          <input
            type="text"
            className="form-control"
            id="pages"
            value={book.pages}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, pages: e.target.value }));
            }}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            cols="30"
            rows="10"
            value={book.description}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, description: e.target.value }));
            }}
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Website</label>
          <input
            type="text"
            className="form-control"
            id="website"
            value={book.website}
            onChange={(e) => {
              setBook((prev) => ({ ...prev, website: e.target.value }));
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};
export default AddData;
