import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import Category from "./components/pages/Category";
import Transaction from "./components/pages/Transaction";
import Configuration from "./components/pages/Configuration";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/transactions" Component={Transaction} />
        <Route path="/categories" Component={Category} />
        <Route path="/configurations" Component={Configuration} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
