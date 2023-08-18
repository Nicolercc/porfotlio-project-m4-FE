import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import CreateQuote from "./components/CreateQuote/CreateQuote";
import EditQuote from "./components/EditQuote/EditQuote";
import Quote from "./components/Quote/Quote";
import AllQuotes from "./components/AllQuotes/AllQuotes";
import Landing from "./components/LandingPage/Landing";

function App() {
  return (
    <Router>
      <Nav />
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quotes" element={<Home />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/quotes/new" element={<CreateQuote />} />
          <Route path="/quotes/edit" element={<EditQuote />} />
          <Route path="/quotes/:id" element={<Quote />} />
          <Route path="/quotes/all" element={<AllQuotes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
