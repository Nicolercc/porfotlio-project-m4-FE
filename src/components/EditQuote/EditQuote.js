import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCategories,
  getQuoteById,
  updateQuoteById,
  deleteQuoteById,
} from "../Api/Api";

function EditQuote() {
  const initialFormData = {
    quote_text: "",
    author: "",
    category: "",
    category_id: "",
    date_added: "",
    rating: "",
    is_featured: false,
    is_favorite: false,
  };

  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  async function deleteQuote(event) {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this quote?"
      );
      if (confirmed) {
        const response = await deleteQuoteById(id);
        let data = response.data;
        alert(`The quote named ${data.name} has been deleted`);
        navigate(`/quotes/categories/${data.category_id}`);
      }
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  }

  async function fetchCategories() {
    try {
      const response = await getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    async function fetchQuoteData() {
      try {
        const response = await getQuoteById(id);
        const quoteData = response.data;
        setFormData(quoteData);
      } catch (error) {
        console.error("Error fetching quote data:", error);
      }
    }
    fetchCategories();
    fetchQuoteData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateQuoteById(id, formData);

      alert(`Quote has been edited`);
      navigate(`/quotes/categories/${formData.category_id}`);
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <div>
      <div className="container card my-5 mx-auto w-75">
        <h1 className="m-5 d-flex justify-content-center font">
          Modify this Quote
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
          </div>
          <div className="mb-4">
            <h4 className="form-h4 font">
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
          </div>
          <div className="mb-4">
            <h4 className="form-h4 font">
              <label htmlFor="date">Date Added: </label>
            </h4>
            <input
              id="date_added"
              type="date"
              name="date_added"
              className="form-control"
              value={formData.date_added}
              onChange={(e) =>
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </div>
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
                <option value="">Select a category</option>{" "}
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
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
          <div className="button-container d-flex justify-content-center m-3 mb-5 font">
            <button type="submit" className="btn btn-secondary mx-3">
              Submit
            </button>
            <button
              className="btn btn-secondary mx-3"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              className="btn btn-secondary mx-3"
              onClick={() => deleteQuote()}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuote;
