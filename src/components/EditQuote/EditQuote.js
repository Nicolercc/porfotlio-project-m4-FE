import React from "react";

function EditQuote() {
  return (
    <div>
      <div className="container card my-5 mx-auto w-75">
        <h1 className="m-5 d-flex justify-content-center">Create Quote</h1>
        <form className="m-5">
          <div className="mb-4">
            <h4 className="form-h4">
              <label htmlFor="quote">Quote: </label>
            </h4>
            <textarea
              id="quote"
              type="text"
              name="quote"
              className="form-control"
              // value={/* Set your quote value here */}
            />
          </div>
          <div className="mb-4">
            <h4 className="form-h4">
              <label htmlFor="author">Author: </label>
            </h4>
            <input
              id="author"
              type="text"
              name="author"
              className="form-control"
              // value={/* Set your author value here */}
            />
          </div>
          <div className="mb-4">
            <h4 className="form-h4">
              <label htmlFor="date">Date Added: </label>
            </h4>
            <input
              id="date"
              type="date"
              name="date"
              className="form-control"
              // value={/* Set your date value here */}
            />
          </div>
          <div className="mb-4">
            <h4 className="form-h4">
              <label htmlFor="category_id">Category:</label>
            </h4>
            <div className="mb-4">
              <select
                id="category_id"
                name="category_id"
                className="form-select form-control"
                // value={/* Set your category_id value here */}
              >
                {/* Map through your categories and render options */}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="form-h4 mx-2">
              <label htmlFor="is_favorite">Is Favorite:</label>
            </h4>
            <input
              id="is_favorite"
              type="checkbox"
              name="is_favorite"
              className="form-check-input"
              // checked={/* Set your is_favorite value here */}
            />
          </div>
          <div className="button-container d-flex justify-content-center m-3 mb-5">
            <button type="submit" className="btn btn-primary mx-3">
              Submit
            </button>
            <button className="btn btn-success mx-3">Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuote;
