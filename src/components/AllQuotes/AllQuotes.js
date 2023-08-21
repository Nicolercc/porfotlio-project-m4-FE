import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuoteByCategoryId } from "../Api/Api";
import Categories from "../Categories/Categories";

function AllQuotes() {
  const { id } = useParams();
  const [quotes, setQuotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuotes() {
      try {
        let result = await getQuoteByCategoryId(id);
        const data = result.data;
        setQuotes(data);
        console.log(data);
      } catch (e) {
        console.log("Error fetching bookmarks:", e);
      }
    }

    fetchQuotes();
  }, [id]);

  if (!quotes.length) {
    return (
      <div className="loader-container loader">
        <div className="d-flex justify-content-center m-5 ">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 ">
          <div className="sidebar">
            <Categories />
          </div>
        </div>
        <div className="col-md-9 col-lg-10">
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
                  <div className="btn-container">
                    <button
                      className="btn btn-secondary my-3"
                      onClick={() => navigate(`/quotes/${quote.id}`)}
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

export default AllQuotes;
