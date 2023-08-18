import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuotesByCategory, getAllQuotes } from "../Api/Api";
import Categories from "../Categories/Categories";

function Home() {
  const [quotes, setQuotes] = useState([]);

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
        <div className="col-md-2 col-lg-2 my-5">
          <Categories />
        </div>
        <div className="col-md-8 col-lg-9 my-5">
          <div className="row">
            {quotes.map((quote) => (
              <div className="col-md-4 my-4" key={quote.id}>
                <div className="card custom-card" style={{ width: "100%" }}>
                  <div className="card-body">
                    <blockquote className="blockquote blockquote-custom bg-white p-3 shadow rounded">
                      <h5 className="card-title">{quote.quote_text}</h5>
                      <p className="mb-0 mt-2 font-italic">
                        <span className="fw-bold">Author:</span> {quote.author}
                      </p>
                      <p className="mb-0 mt-2 font-italic">
                        <span className="fw-bold">Category:</span>{" "}
                        {quote.category}
                      </p>
                      <Link
                        to={`/quotes/${quote.id}`}
                        className="btn btn-success mt-3 d-flex justify-content-center"
                      >
                        View More
                      </Link>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
