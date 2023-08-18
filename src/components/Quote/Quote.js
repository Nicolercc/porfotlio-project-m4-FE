import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteById, deleteQuoteById } from "../Api/Api";

function Quote() {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const result = await getQuoteById(id);
        console.log("data:", result);
        setQuote(result.data);
      } catch (e) {
        return e;
      }
    };
    fetchQuote();
  }, [id]);

  async function deleteQuote() {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this quote?"
      );
      if (confirmed) {
        const result = await deleteQuoteById(id);
        let data = result.data;
        alert(`the quote by ${data.autor} has been deleted`);
        navigate(`/`);
      }
    } catch (e) {
      console.error("Error deleting quote:", e);
    }
  }

  if (!quote) {
    return (
      <div className="loader-container">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  return <div>Quote</div>;
}

export default Quote;
