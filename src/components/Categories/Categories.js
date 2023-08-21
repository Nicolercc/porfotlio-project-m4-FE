import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategories } from "../Api/Api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (!categories.length) {
    return (
      <div className="loader-container loader">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="row sidebar" id="sidebar">
      <div className="">
        <div className="list-group ">
          <div className="hover my-4 d-flex justify-content-center sidebar-font">
            <Link to="all-quotes" className="sidebar-font">
              All Quotes
            </Link>
          </div>
          {categories &&
            categories.map((category) => {
              return (
                <div
                  className="hover my-4 d-flex justify-content-center "
                  key={category.id}
                >
                  <Link to={`/quotes/categories/${category.id}`}>
                    <p className="sidebar-font"> {category.name} </p>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Categories;
