import React, { useState, useEffect } from "react";
import { getAllQuotes } from "../Api/Api";
import Categories from "../Categories/Categories";
import { useNavigate, useParams } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  async function fetchQuotes() {
    try {
      let result = await getAllQuotes();
      setQuotes(result.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  const featuredQuotes = quotes.filter((quote) => quote.is_featured);

  const handleNextClick = () => {
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    setCurrentQuoteIndex(nextIndex);
  };

  const handlePrevClick = () => {
    const prevIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
    setCurrentQuoteIndex(prevIndex);
  };
  console.log(featuredQuotes);

  return (
    <section className=" gradient-custom">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-lg-2 ">
            <div className="sidebar">
              <Categories />
            </div>
          </div>
          <div className="col-md-9 col-lg-10 d-flex align-items-center justify-content-center">
            <div className="col col-xl-9">
              <div className="card card-size">
                <div className="card-body py-5">
                  <div
                    id="carouselDarkVariant"
                    className="carousel slide carousel-dark"
                    data-mdb-ride="carousel"
                  >
                    {featuredQuotes.length > 0 ? (
                      <div className="carousel-indicators mb-0 ">
                        {featuredQuotes.map((quote, index) => (
                          <button
                            key={index}
                            data-mdb-target="#carouselDarkVariant"
                            data-mdb-slide-to={index}
                            className={
                              index === currentQuoteIndex ? "active" : ""
                            }
                            aria-label={`Slide ${index + 1}`}
                          ></button>
                        ))}
                      </div>
                    ) : (
                      <p>Loading quotes...</p>
                    )}

                    <div className="carousel-inner pt-2 pb-5 center">
                      {quotes.map((quote, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${
                            index === currentQuoteIndex ? "active" : ""
                          }`}
                        >
                          <p>{quote.quote_text}</p>
                          <p>{quote.author}</p>
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="prev"
                      onClick={handlePrevClick}
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-mdb-target="#carouselDarkVariant"
                      data-mdb-slide="next"
                      onClick={handleNextClick}
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
