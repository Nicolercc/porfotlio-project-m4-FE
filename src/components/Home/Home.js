import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllQuotesByCategory, getAllQuotes } from "../Api/Api";
import Categories from "../Categories/Categories";

function Home() {
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    try {
      const response = await getAllQuotes();
      console.log("API Response:", response); // Check the response in the console
      if (response && response.data) {
        setQuotes(response.data);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (!quotes.length) {
    return (
      <div className="loader-container">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 my-5 ">
          <Categories />
        </div>
        <div className="col-md-9 col-lg-10 my-5">
          <div className="row">
            {quotes.map((quote) => (
              <div className="col-md-4 mb-4" key={quote.id}>
                <figure
                  className="text-center bg-white py-5 px-4 shadow-2 rounded card m-5"
                  style={{ borderRadius: "0.75rem" }}
                >
                  <blockquote className="blockquote pb-2">
                    <p>
                      <i
                        className="fas fa-angle-double-left"
                        style={{ color: "#f9a169" }}
                      ></i>
                      <span className="lead font-italic">
                        {quote.quote_text}
                      </span>
                      <i
                        className="fas fa-angle-double-right"
                        style={{ color: "#f9a169" }}
                      ></i>
                    </p>
                  </blockquote>
                  <figcaption className="blockquote-footer mb-0 font-italic">
                    {quote.author}
                  </figcaption>
                  <div className="btn-container my-4 d-flex justify-content-center">
                    <button
                      onClick={() => navigate(`/quotes/${quote.id}`)}
                      className="btn btn-secondary d-flex justify-content-center"
                    >
                      View
                    </button>
                  </div>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
