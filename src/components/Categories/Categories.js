import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategories } from "../Api/Api";
// import "./Categories.css";
function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      //const response = await axios.get(url + "/bookmarks/" + id);
      const response = await getAllCategories();
      const data = response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (!categories.length) {
    return (
      <div className="loader-container">
        <div className="d-flex justify-content-center m-5 loader ">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col">
        <div className="list-group sidebar">
          <div className="hover my-4">
            <Link to="/">All Recipes</Link>
          </div>
          {categories &&
            categories.map((category) => {
              return (
                <div className="hover my-4">
                  <Link key={category.id} to={`/categories/${category.id}`}>
                    {category.name}
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
