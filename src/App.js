import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import CreateQuote from "./components/CreateQuote/CreateQuote";
import EditQuote from "./components/EditQuote/EditQuote";
import Quote from "./components/Quote/Quote";
import AllQuotes from "./components/AllQuotes/AllQuotes";
import Landing from "./components/LandingPage/Landing";
import DisplayAllQuotes from "./components/AllQuotes/DisplayAllQuotes";
import Categories from "./components/Categories/Categories";

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <div className="sidebar">
                <Categories />
              </div>
            </div>
            <div className="col-md-9 col-lg-10">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/quotes" element={<DisplayAllQuotes />} />
                <Route path="/quotes/new" element={<CreateQuote />} />
                <Route path="/quotes/:id/edit" element={<EditQuote />} />
                <Route path="/quotes/:id" element={<Quote />} />
                <Route path="/all-quotes" element={<DisplayAllQuotes />} />
                <Route path="/quotes/categories/:id" element={<AllQuotes />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
