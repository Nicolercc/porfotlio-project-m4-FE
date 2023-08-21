import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories, createQuote } from "../Api/Api";
import "./CreateQuote.css";

function CreateQuote() {
  const initialFormData = {
    quote_text: "",
    author: "",
    category: "",
    category_id: "",
    date_added: new Date().toISOString().slice(0, 10),
    rating: "",
    is_featured: false,
    is_favorite: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  async function fetchCategories() {
    try {
      let res = await getAllCategories();
      console.log({ res });
      setCategories(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!categories.length) {
    return (
      <div className="loader-container">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newQuote = await createQuote(formData);

      if (newQuote) {
        console.log(formData);

        const newQuoteId = newQuote.id;

        setFormData(initialFormData);
        alert(`Quote has been created`);

        navigate(`/quotes/${newQuoteId}`);
      }
    } catch (e) {
      return alert(e.response.data.error);
    }
  };

  return (
    <div>
      <div className="container card my-5 mx-auto w-75">
        <h1 className="m-5 d-flex justify-content-center quote-font fw-bold">
          Unleash your inner author and compose a quote
        </h1>
        <form className="m-5" onSubmit={handleSubmit}>
          <div className="mb-4">
            <h4 className="form-h4 font">
              <label htmlFor="quote">Quote: </label>
            </h4>
            <textarea
              id="quote_text"
              type="text"
              name="quote_text"
              className="form-control"
              value={formData.quote_text}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>{" "}
          <div className="mb-4">
            <h4 className="form-h4 font">
              {" "}
              <label htmlFor="author">Author: </label>
            </h4>
            <input
              id="author"
              type="text"
              name="author"
              className="form-control"
              value={formData.author}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>{" "}
          <div className="mb-4">
            <h4 className="form-h4 font">
              <label htmlFor="date">Date Added: </label>
            </h4>
            <input
              id="date"
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>{" "}
          <div className="mb-4">
            <h4 className="form-h4 font">
              <label htmlFor="category_id">Category:</label>
            </h4>
            <div className="mb-4">
              <select
                id="category_id"
                name="category_id"
                className="form-select form-control"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                  }))
                }
              >
                {categories.map((category) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="form-h4 mx-2 font">
              <label htmlFor="is_favorite">Is Favorite:</label>
            </h4>

            <input
              id="is_favorite"
              type="checkbox"
              name="is_favorite"
              className="form-check-input"
              checked={formData.is_favorite}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.checked,
                }))
              }
            />
          </div>
          <div className="button-container d-flex justify-content-center m-3 mb-5 ">
            <button type="submit" className="btn btn-primary mx-3">
              Submit
            </button>

            <button
              className="btn btn-success mx-3"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuote;
