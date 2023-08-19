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
        console.log(data);
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

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5  ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-9 col-xl-7">
              <div className="card my-5" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <div className="text-center mb-4 pb-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-quotes/bulb.webp"
                      alt="Bulb"
                      width="100"
                    />
                  </div>
                  <figure className="text-center mb-0">
                    <blockquote className="blockquote">
                      <p className="pb-3">
                        <i className="fas fa-quote-left fa-xs text-primary"></i>
                        {quote ? (
                          <span className="lead font-italic">
                            {quote.quote_text}
                          </span>
                        ) : (
                          <span className="lead font-italic">
                            No quote loaded
                          </span>
                        )}
                        <i className="fas fa-quote-right fa-xs text-primary"></i>
                      </p>
                    </blockquote>
                    <figcaption className="blockquote-footer mb-0">
                      {quote.author}
                    </figcaption>
                  </figure>
                </div>
              </div>
              <div className=" btn-container my-4 ">
                <button
                  className=" btn btn-primary mx-3"
                  onClick={() => navigate("/quotes/:id/edit")}
                >
                  Edit
                </button>
                <button
                  className=" btn btn-secondary mx-3"
                  onClick={() => {
                    deleteQuote();
                  }}
                >
                  Delete
                </button>
                <button
                  className=" btn btn-danger mx-3"
                  onClick={() => navigate(-1)}
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Quote;
