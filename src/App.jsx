import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import About from "./components/About";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Cart from "./components/Cart";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <div id="home">
                  <Home />
                </div>
                <div id="menu">
                  <Menu />
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="products">
                  <Products />
                </div>
                <div id="reviews">
                  <Reviews />
                </div>
              </main>
              <Footer />
            </>
          }
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
