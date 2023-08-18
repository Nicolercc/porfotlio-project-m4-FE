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
    <div>
      <Categories />
      <>
        {quotes &&
          quotes.map((quote) => (
            <div className="col-md-3 m-5" key={quote.id}>
              <div className="card custom-card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <blockquote className="blockquote blockquote-custom bg-white p-5 shadow rounded">
                    <div className="blockquote-custom-icon bg-info shadow-sm"></div>
                    <h4 className="card-title">{quote.quote_text}</h4>
                    <p className="mb-0 mt-2 font-italic">
                      <span className="fw-bold">Author:</span> {quote.author}
                    </p>
                    <p className="mb-0 mt-2 font-italic">
                      <span className="fw-bold">Category:</span>{" "}
                      {quote.category}
                    </p>

                    <Link
                      to={`/quotes/${quote.id}`}
                      className="btn btn-success d-flex justify-content-center"
                    >
                      View More
                    </Link>
                    <footer className="blockquote-footer pt-4 mt-4 border-top">
                      Words to inspire and reflect upon.
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
      </>
    </div>
  );
}

export default Home;
