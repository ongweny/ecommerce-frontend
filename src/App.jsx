import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Terms from "./Pages/Terms";
import About from "./Pages/About";
import Help from "./Pages/Help"
import Contact from "./Pages/Contact";
import Account from "./Pages/Account"
import Cart from "./Pages/Cart";
import Policies from "./Pages/Policies";

const Home = () => (
  <main className="content">
    <h1>Welcome to Hcommerce</h1>
  </main>
);

const App = () => {
  return (
    <Router>
      <div className="mains">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/help"  element={<Help />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/account"  element={<Account />} />
          <Route path="/policies"  element={<Policies />} />
          <Route path="/Cart"  element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
